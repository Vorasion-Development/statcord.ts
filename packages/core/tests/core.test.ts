import { Envapter } from 'envapt'

import { Statcord, type StatcordStatsPayload } from '../src'

interface HttpTimeoutValue {
  expected: string
  isValid: boolean
  value?: number
}

describe('Statcord Core Suite', () => {
  const apiKey = Envapter.get('STATCORD_API_KEY')
  const testBotId = Envapter.get('TEST_BOT_ID')
  const createClient = (timeout?: number) => new Statcord('11111', 'SC-gibberish', timeout)

  it('should create an instance of Statcord', () => {
    const statcord = createClient()
    expect(statcord).toBeInstanceOf(Statcord)
    expect(statcord.apiKey).toBe('SC-gibberish')
    expect(statcord.botId).toBe('11111')
  })

  it.skipIf(!process.env['STATCORD_API_KEY'])('should read an api key from the environment', () => {
    const statcord = new Statcord('11111')
    expect(statcord.apiKey).toBe(apiKey)
  })

  it.skipIf(apiKey)('should fail without an api key', () => {
    expect(() => new Statcord('11111')).toThrow()
  })

  it.each<HttpTimeoutValue>([
    { expected: 'invalid', isValid: false, value: 0 },
    { expected: 'invalid', isValid: false, value: -1 },
    { expected: 'invalid', isValid: false, value: -2 },
    { expected: 'invalid', isValid: false, value: -3 },
    { expected: 'valid', isValid: true, value: 300000 },
    { expected: 'invalid', isValid: false, value: Infinity },
    { expected: 'invalid', isValid: false, value: -Infinity },
    { expected: 'invalid', isValid: false, value: NaN },
    { expected: 'valid', isValid: true, value: undefined }, // This should default to the standard timeout
  ])('should handle $value as $expected', ({ isValid, value }) => {
    if (isValid) {
      expect(() => createClient(value)).not.toThrow()
    } else {
      expect(() => createClient(value)).toThrow(RangeError)
    }
  })

  it.skipIf(!apiKey || !testBotId)('should post successfully', async () => {
    const statcord = new Statcord(testBotId!, apiKey!)
    const payload: StatcordStatsPayload = {
      guildCount: 123, // Example value
    }

    const spy = vi.spyOn(statcord, 'postStats')

    await expect(statcord.postStats(payload)).resolves.toBeTruthy()
    expect(spy).toHaveBeenCalledWith(payload)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedTimes(1)
  })

  it('should fail with an invalid api key', async () => {
    const statcord = new Statcord('11111', 'SC-invalid')
    const payload: StatcordStatsPayload = {
      guildCount: 123, // Example value
    }

    const spy = vi.spyOn(statcord, 'postStats')
    await expect(statcord.postStats(payload)).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(payload)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveReturnedTimes(1)
  })
})
