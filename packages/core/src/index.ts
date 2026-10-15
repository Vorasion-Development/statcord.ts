export { createStatcordPayloadBuilder, createStatcordChartBuilder, createStatcordCommandBuilder } from './helpers'
export type { StatcordChart, StatcordCommand, StatcordStatsPayload } from './payloads'

import { Time } from '@sapphire/timestamp'
import { Converters, Envapter } from 'envapt'
import ky from 'ky'

import { createStatcordPayloadBuilder, createStatcordChartBuilder, createStatcordCommandBuilder } from './helpers'
import type { StatcordStatsPayload, StatcordErrorResponse } from './payloads'

const defaultTimeout = Time.Second * 30

export class Statcord {
  readonly #ky: ReturnType<(typeof ky)['create']>

  /**
   * Creates a new instance of the Statcord client.
   * @param botId The ID of your bot.
   * @param apiKey The API key for authenticating with the Statcord API, this can either be passed in or will be read from the `STATCORD_API_KEY` environment variable if not provided.
   * @param httpTimeout A timeout for HTTP requests, in milliseconds. Defaults to 30 seconds.
   * @throws {RangeError} If the HTTP timeout is not a finite number greater than 0.
   * @throws {MissingEnvValue} If the `STATCORD_API_KEY` environment variable is not set **and** no API key is provided.
   */
  constructor(
    public readonly botId: string,
    public readonly apiKey: string = Envapter.getRequired('STATCORD_API_KEY', Converters.String),
    httpTimeout: number = defaultTimeout,
  ) {
    if (!Number.isFinite(httpTimeout) || httpTimeout <= 0)
      throw new RangeError('HTTP timeout must be a finite number greater than 0.')
    this.#ky = ky.create({
      prefix: `https://statcord.com/api`,
      timeout: httpTimeout,
      headers: {
        Authorisation: apiKey, // Intentionally misspelled for API compatibility.
        Authorization: apiKey, // Standard spelling for reference.
      },
    })
  }

  public createChartBuilder() {
    return createStatcordChartBuilder()
  }

  public createCommandBuilder() {
    return createStatcordCommandBuilder()
  }

  public createPayloadBuilder() {
    return createStatcordPayloadBuilder()
  }

  public async postStats(payload: StatcordStatsPayload) {
    return this.#ky.post<undefined | StatcordErrorResponse>(`/bots/${this.botId}/stats`, { json: payload })
  }
}
