import type { StatcordStatsPayload, StatcordChart, StatcordCommand } from './payloads'

type RestOrArray<T> = [T[]] | T[]

export class StatcordPayloadBuilder {
  private readonly payload: StatcordStatsPayload = {}

  public setGuildCount(guildCount: number): this {
    this.payload.guildCount = guildCount
    return this
  }

  public setShardCount(shardCount: number): this {
    this.payload.shardCount = shardCount
    return this
  }

  public setUserCount(userCount: number): this {
    this.payload.userCount = userCount
    return this
  }

  public setMemberCount(memberCount: number): this {
    this.payload.members = memberCount
    return this
  }

  public setRamUsage(ramUsage: number): this {
    this.payload.ramUsage = ramUsage
    return this
  }

  public setTotalRam(totalRam: number): this {
    this.payload.totalRam = totalRam
    return this
  }

  public setCpuUsage(cpuUsage: number): this {
    this.payload.cpuUsage = cpuUsage
    return this
  }

  public build(): StatcordStatsPayload {
    return this.payload
  }

  // Overloaded methods for setting custom charts and top commands
  public setCustomCharts(customCharts: StatcordChart[]): this
  public setCustomCharts(...customCharts: StatcordChart[]): this

  public setCustomCharts(...charts: RestOrArray<StatcordChart>): this {
    this.payload.customCharts =
      charts.length === 1 && Array.isArray(charts[0]) ? charts[0] : (charts as StatcordChart[])
    return this
  }

  public setTopCommands(topCommands: StatcordCommand[]): this
  public setTopCommands(...topCommands: StatcordCommand[]): this

  public setTopCommands(...commands: RestOrArray<StatcordCommand>): this {
    this.payload.topCommands =
      commands.length === 1 && Array.isArray(commands[0]) ? commands[0] : (commands as StatcordCommand[])
    return this
  }
}

export class StatcordChartBuilder {
  private readonly chart: StatcordChart = {
    id: '',
    data: {},
  }

  public setName(name: string): this {
    this.chart.id = name
    return this
  }

  public setData(data: Record<string, number>): this {
    this.chart.data = data
    return this
  }

  public build(): StatcordChart {
    return this.chart
  }
}

export class StatcordCommandBuilder {
  private readonly command: StatcordCommand = {
    name: '',
    count: 0,
  }

  public setName(name: string): this {
    this.command.name = name
    return this
  }

  public setUsageCount(usageCount: number): this {
    this.command.count = usageCount
    return this
  }

  public build(): StatcordCommand {
    return this.command
  }
}
