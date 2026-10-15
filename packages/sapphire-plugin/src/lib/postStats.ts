import os from 'node:os'

import { container } from '@sapphire/pieces'
import { OSUtils } from 'node-os-utils'

import { charts, commands } from '../maps'

const osUtils = new OSUtils()

async function getCpuUsage() {
  return await osUtils.cpu.usage()
}

function getRamUsage() {
  return ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
}

export async function postStats() {
  const { client, statcord } = container

  const guildCount = client.guilds.cache.size
  const shardCount = client.ws.shards.size
  const userCount = client.users.cache.size
  const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)

  const builder = statcord
    .createPayloadBuilder()
    .setGuildCount(guildCount)
    .setShardCount(shardCount)
    .setUserCount(userCount)
    .setMemberCount(memberCount)

  if (charts.size > 0) builder.setCustomCharts(Array.from(charts.values()))
  if (commands.size > 0) builder.setTopCommands(Array.from(commands.values()))

  const statcordAutopostOptions = container.client.options.statcord?.autopost

  if (typeof statcordAutopostOptions === 'object' && statcordAutopostOptions.includeRam)
    builder.setRamUsage(getRamUsage()).setTotalRam(os.totalmem())

  if (typeof statcordAutopostOptions === 'object' && statcordAutopostOptions.includeCpu) {
    const cpuUsage = await getCpuUsage()

    if (!cpuUsage.success) {
      container.logger.warn('Failed to retrieve CPU usage, pushing without it.')
      await statcord.postStats(builder.build())
      return
    }

    builder.setCpuUsage(cpuUsage.data)
  }

  await statcord.postStats(builder.build())
}
