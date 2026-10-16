import os from 'node:os'

import { type CoreBase, InteractionKind, Plugin, type SubscriptionData } from '@seedcord/gateway'
import { Statcord, type StatcordChart, type StatcordCommand } from '@statcord-ts/core'
import type { StatcordPluginOptions } from '@statcord-ts/plugin-options'
import { OSUtils } from 'node-os-utils'

export interface SeedcordStatcordPluginOptions extends StatcordPluginOptions {
  allowGuildCommands?: boolean
}

export class StatcordPlugin extends Plugin {
  declare private client: Statcord
  #acceptedInteractionKinds: `${InteractionKind}`[] = [
    InteractionKind.MessageContextMenu,
    InteractionKind.Slash,
    InteractionKind.UserContextMenu,
  ]
  #autopostingInterval: NodeJS.Timeout | null = null
  #osUtils: OSUtils = new OSUtils()

  public readonly charts: Map<string, StatcordChart> = new Map<string, StatcordChart>()
  public readonly commands: Map<string, StatcordCommand> = new Map<string, StatcordCommand>()

  constructor(
    host: CoreBase,
    private readonly options?: SeedcordStatcordPluginOptions,
  ) {
    super(host)

    if (!this.options?.apiKey && !process.env['STATCORD_API_KEY']) this.rejectOptions('apiKey is required.')
    if (
      this.options?.httpTimeout !== undefined &&
      (!Number.isFinite(this.options.httpTimeout) || this.options.httpTimeout <= 0)
    )
      this.rejectOptions('httpTimeout must be greater than 0.')
  }

  override dispose(): Promise<void> {
    this.stopAutoposting()
    return Promise.resolve()
  }

  override init(): Promise<void> {
    this.logger.info('Statcord plugin initialized.')

    this.core.bus.on('commandsDeployed', (event) => this.addDeployedCommandsToCommands(event))
    this.core.bus.on('interactionDispatched', (event) => this.handleCommandInteraction(event))

    return Promise.resolve()
  }

  override ready(): Promise<void> {
    this.client = new Statcord(this.core.applicationId, this.options?.apiKey, this.options?.httpTimeout)
    if (
      (this.options?.autopost || (typeof this.options?.autopost === 'object' && this.options.autopost.enabled)) &&
      !this.#autopostingInterval
    )
      this.#autopostingInterval = setInterval(
        () => void this.postStats(),
        typeof this.options?.autopost === 'object' ? (this.options.autopost.interval ?? 60000) : 60000,
      )
    return Promise.resolve()
  }

  public stopAutoposting(): void {
    if (this.#autopostingInterval) {
      clearInterval(this.#autopostingInterval)
      this.#autopostingInterval = null
    }
  }

  public async postStats() {
    const guilds = this.core.bot.client.guilds.cache
    const guildCount = guilds.size
    const shardCount = this.core.bot.client.ws.shards.size
    const userCount = this.core.bot.client.users.cache.size
    const memberCount = guilds.reduce((acc, guild) => acc + guild.memberCount, 0)

    const builder = this.client
      .createPayloadBuilder()
      .setGuildCount(guildCount)
      .setShardCount(shardCount)
      .setUserCount(userCount)
      .setMemberCount(memberCount)
      .setCustomCharts(Array.from(this.charts.values()))
      .setTopCommands(Array.from(this.commands.values()))

    if (typeof this.options?.autopost !== 'object') {
      const cpuUsage = await this.getCpuUsage()
      const ramUsage = this.getRamUsage()
      builder.setTotalRam(os.totalmem()).setRamUsage(ramUsage)

      if (cpuUsage.success) builder.setCpuUsage(cpuUsage.data)
      else this.logger.warn('Failed to retrieve CPU usage, skipping it.')

      await this.client.postStats(builder.build())
      return
    }

    const autopostingOptions = typeof this.options?.autopost === 'object' ? this.options.autopost : {}

    if (autopostingOptions.includeRam) {
      const ramUsage = this.getRamUsage()
      builder.setTotalRam(os.totalmem()).setRamUsage(ramUsage)
    }

    if (autopostingOptions.includeCpu) {
      const cpuUsage = await this.getCpuUsage()

      if (!cpuUsage.success) {
        this.logger.warn('Failed to retrieve CPU usage, doing a push without it.')
        await this.client.postStats(builder.build())
        return
      }

      builder.setCpuUsage(cpuUsage.data)
    }

    await this.client.postStats(builder.build())
  }

  public addCustomChart(name: string, data: Record<string, number>) {
    if (this.charts.has(name)) return
    this.charts.set(name, { id: name, data })
  }

  public get statcordClient(): Statcord {
    if (!this.client)
      throw new Error(
        'Statcord client has not been initialized fully yet, wait until after login before accessing the client.',
      )
    return this.client
  }

  private addDeployedCommandsToCommands(event: SubscriptionData<'commandsDeployed'>) {
    for (const command of event.global) {
      if (this.commands.has(command.name)) continue
      this.commands.set(command.name, { name: command.name, count: 0 })
    }

    if (this.options?.allowGuildCommands) {
      for (const commands of Object.values(event.guilds)) {
        for (const command of commands) {
          if (this.commands.has(command.name)) continue
          this.commands.set(command.name, { name: command.name, count: 0 })
        }
      }
    }
  }

  private handleCommandInteraction({ kind, outcome, routeId }: SubscriptionData<'interactionDispatched'>) {
    if (!this.#acceptedInteractionKinds.includes(kind) || outcome === 'failed') return

    const command = this.commands.get(this.getCommandName(routeId))

    if (command) command.count++
  }

  private getCommandName(routeId: string) {
    const name = routeId.slice(routeId.indexOf(':') + 1)
    const end = name.indexOf('/')

    return end === -1 ? name : name.slice(0, end)
  }

  private getCpuUsage() {
    return this.#osUtils.cpu.usage()
  }

  private getRamUsage() {
    return ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
  }
}
