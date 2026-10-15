import { StatcordChartBuilder, StatcordCommandBuilder, StatcordPayloadBuilder } from './builders'

export function createStatcordPayloadBuilder() {
  return new StatcordPayloadBuilder()
}

export function createStatcordChartBuilder() {
  return new StatcordChartBuilder()
}

export function createStatcordCommandBuilder() {
  return new StatcordCommandBuilder()
}
