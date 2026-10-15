import {
  createStatcordChartBuilder,
  createStatcordCommandBuilder,
  createStatcordPayloadBuilder,
  Statcord,
} from '../src'
import { StatcordChartBuilder, StatcordCommandBuilder, StatcordPayloadBuilder } from '../src/builders'

describe.concurrent('Statcord Instance Builder Methods', () => {
  let statcord = new Statcord('11111', 'SC-gibberish')

  it('should create a Statcord payload builder', () => {
    const payloadBuilder = statcord.createPayloadBuilder()
    expect(payloadBuilder).toBeDefined()
    expect(payloadBuilder).toBeInstanceOf(StatcordPayloadBuilder)
  })

  it('should create a Statcord command builder', () => {
    const commandBuilder = statcord.createCommandBuilder()
    expect(commandBuilder).toBeDefined()
    expect(commandBuilder).toBeInstanceOf(StatcordCommandBuilder)
  })

  it('should create a Statcord chart builder', () => {
    const chartBuilder = statcord.createChartBuilder()
    expect(chartBuilder).toBeDefined()
    expect(chartBuilder).toBeInstanceOf(StatcordChartBuilder)
  })
})

describe.concurrent('Builder Helper Methods', () => {
  it('should create a Statcord payload builder using the helper method', () => {
    const payloadBuilder = createStatcordPayloadBuilder()
    expect(payloadBuilder).toBeDefined()
    expect(payloadBuilder).toBeInstanceOf(StatcordPayloadBuilder)
  })

  it('should create a Statcord command builder using the helper method', () => {
    const commandBuilder = createStatcordCommandBuilder()
    expect(commandBuilder).toBeDefined()
    expect(commandBuilder).toBeInstanceOf(StatcordCommandBuilder)
  })

  it('should create a Statcord chart builder using the helper method', () => {
    const chartBuilder = createStatcordChartBuilder()
    expect(chartBuilder).toBeDefined()
    expect(chartBuilder).toBeInstanceOf(StatcordChartBuilder)
  })
})
