export interface StatcordChart {
  id: string
  data: Record<string, number>
}

export interface StatcordCommand {
  name: string
  count: number
}

export interface StatcordStatsPayload {
  guildCount?: number
  shardCount?: number
  userCount?: number
  members?: number
  ramUsage?: number
  totalRam?: number
  cpuUsage?: number
  customCharts?: StatcordChart[]
  topCommands?: StatcordCommand[]
}

export interface StatcordErrorResponse {
  statusCode: number
  statusMessage: string
}
