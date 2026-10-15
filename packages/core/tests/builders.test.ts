import { createStatcordChartBuilder, createStatcordCommandBuilder, createStatcordPayloadBuilder } from '../src'
import { StatcordChartBuilder, StatcordCommandBuilder, StatcordPayloadBuilder } from '../src/builders'

describe('Chart Builder', () => {
  let builder: StatcordChartBuilder

  beforeEach(() => {
    builder = createStatcordChartBuilder()
  })

  it('should be an instance of StatcordChartBuilder', () => {
    expect(builder).toBeInstanceOf(StatcordChartBuilder)
  })

  it('should have a setName method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setName')
    expect(typeof builder.setName).toBe('function')

    const newBuilder = builder.setName('Test Name')

    expect(newBuilder.build().id).toBe('Test Name')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('Test Name')
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setName('Another Test Name')).toBe(builder)
  })

  it('should have a setData method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setData')
    expect(typeof builder.setData).toBe('function')

    const newBuilder = builder.setData({
      test: 3,
      anotherTest: 7,
    })

    expect(newBuilder.build().data).toEqual({ test: 3, anotherTest: 7 })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ test: 3, anotherTest: 7 })
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setData({ test: 4, anotherTest: 5 })).toBe(builder)
  })
})

describe('Command Builder', () => {
  let builder: StatcordCommandBuilder

  beforeEach(() => {
    builder = createStatcordCommandBuilder()
  })

  it('should be an instance of StatcordCommandBuilder', () => {
    expect(builder).toBeInstanceOf(StatcordCommandBuilder)
  })

  it('should have a setName method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setName')
    expect(typeof builder.setName).toBe('function')

    const newBuilder = builder.setName('Test Name')

    expect(newBuilder.build().name).toBe('Test Name')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('Test Name')
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setName('Another Test Name')).toBe(builder)
  })

  it('should have a setUsageCount method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setUsageCount')
    expect(typeof builder.setUsageCount).toBe('function')

    const newBuilder = builder.setUsageCount(42)

    expect(newBuilder.build().count).toBe(42)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(42)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setUsageCount(7)).toBe(builder)
  })
})

describe('Payload Builder', () => {
  let builder: StatcordPayloadBuilder

  beforeEach(() => {
    builder = createStatcordPayloadBuilder()
  })

  it('should be an instance of StatcordPayloadBuilder', () => {
    expect(builder).toBeInstanceOf(StatcordPayloadBuilder)
  })
  it('should have a setGuildCount method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setGuildCount')
    expect(typeof builder.setGuildCount).toBe('function')

    const newBuilder = builder.setGuildCount(123)

    expect(newBuilder.build().guildCount).toBe(123)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(123)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setGuildCount(456)).toBe(builder)
  })

  it('should have a setShardCount method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setShardCount')
    expect(typeof builder.setShardCount).toBe('function')

    const newBuilder = builder.setShardCount(10)

    expect(newBuilder.build().shardCount).toBe(10)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(10)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setShardCount(5)).toBe(builder)
  })

  it('should have a setUserCount method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setUserCount')
    expect(typeof builder.setUserCount).toBe('function')

    const newBuilder = builder.setUserCount(100)

    expect(newBuilder.build().userCount).toBe(100)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(100)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setUserCount(200)).toBe(builder)
  })

  it('should have a setMemberCount method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setMemberCount')
    expect(typeof builder.setMemberCount).toBe('function')

    const newBuilder = builder.setMemberCount(50)

    expect(newBuilder.build().members).toBe(50)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(50)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setMemberCount(75)).toBe(builder)
  })

  it('should have a setRamUsage method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setRamUsage')
    expect(typeof builder.setRamUsage).toBe('function')

    const newBuilder = builder.setRamUsage(512)

    expect(newBuilder.build().ramUsage).toBe(512)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(512)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setRamUsage(1024)).toBe(builder)
  })

  it('should have a setTotalRam method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setTotalRam')
    expect(typeof builder.setTotalRam).toBe('function')

    const newBuilder = builder.setTotalRam(2048)

    expect(newBuilder.build().totalRam).toBe(2048)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2048)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setTotalRam(4096)).toBe(builder)
  })

  it('should have a setCpuUsage method that returns the builder', () => {
    const spy = vi.spyOn(builder, 'setCpuUsage')
    expect(typeof builder.setCpuUsage).toBe('function')

    const newBuilder = builder.setCpuUsage(75)

    expect(newBuilder.build().cpuUsage).toBe(75)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(75)
    expect(spy).toHaveReturnedWith(builder)
    expect(builder.setCpuUsage(50)).toBe(builder)
  })
})

describe('Overloaded Payload Builder Methods', () => {
  let builder: StatcordPayloadBuilder

  beforeEach(() => {
    builder = new StatcordPayloadBuilder()
  })

  it('should have an overloaded setCustomCharts method that accepts an array or a rest and returns the builder', () => {
    const spy = vi.spyOn(builder, 'setCustomCharts')
    expect(typeof builder.setCustomCharts).toBe('function')

    const data = [
      { id: 'chart1', data: { test: 10 } },
      { id: 'chart2', data: { test: 20 } },
    ]
    const newBuilderArray = builder.setCustomCharts(data)
    expect(newBuilderArray.build().customCharts).toEqual(data)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(data)
    expect(spy).toHaveReturnedWith(builder)

    const newBuilderRest = builder.setCustomCharts(...data)
    expect(newBuilderRest.build().customCharts).toEqual(data)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(...data)
    expect(spy).toHaveReturnedWith(builder)
  })

  it('should have an overloaded setTopCommands method that accepts an array or a rest and returns the builder', () => {
    const spy = vi.spyOn(builder, 'setTopCommands')
    expect(typeof builder.setTopCommands).toBe('function')

    const data = [
      { name: 'command1', count: 10 },
      { name: 'command2', count: 20 },
    ]
    const newBuilderArray = builder.setTopCommands(data)
    expect(newBuilderArray.build().topCommands).toEqual(data)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(data)
    expect(spy).toHaveReturnedWith(builder)

    const newBuilderRest = builder.setTopCommands(...data)
    expect(newBuilderRest.build().topCommands).toEqual(data)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(...data)
    expect(spy).toHaveReturnedWith(builder)
  })
})
