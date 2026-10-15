import { Events, Listener, type ChatInputCommandAcceptedPayload } from '@sapphire/framework'

import { commands } from '../maps'

export class StatcordPluginChatInputCommandAcceptedListener extends Listener<typeof Events.ChatInputCommandAccepted> {
  constructor(context: Listener.LoaderContext, options?: Listener.Options) {
    super(context, {
      ...options,
      name: 'PluginStatcordChatInputCommandAccepted',
      event: Events.ChatInputCommandAccepted,
    })
  }

  public run({ command }: ChatInputCommandAcceptedPayload) {
    if (this.container.client.options.statcord?.debug)
      this.container.logger.debug(`[Statcord] Logging use of the ${command.name} interaction command`)

    const currentCommand = commands.get(command.name)

    if (currentCommand) currentCommand.count++
    else {
      if (this.container.client.options.statcord?.debug)
        this.container.logger.debug(`[Statcord] Command ${command.name} not found in the commands map, setting it...`)

      commands.set(command.name, { name: command.name, count: 1 })
    }
  }
}
