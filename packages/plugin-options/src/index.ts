export interface StatcordAutopostingOptions {
  /**
   * Whether autoposting is enabled. Defaults to false.
   */
  enabled?: boolean
  /**
   * The interval in milliseconds at which to autopost statistics. Defaults to 60000 (1 minute).
   */
  interval?: number
  /**
   * Whether to include CPU usage statistics, defaults to false.
   */
  includeCpu?: boolean
  /**
   * Whether to include RAM usage statistics, defaults to false.
   */
  includeRam?: boolean
}

export interface StatcordPluginOptions {
  /**
   * Your Statcord API key. Defaults to the core default (reading from STATCORD_API_KEY).
   */
  apiKey?: string
  /**
   * A boolean or an object specifying autoposting options. If a boolean, it indicates whether autoposting is enabled.
   * If an object, it can contain more detailed autoposting settings.
   * If only set to true, it includes everything it can acquire automatically.
   */
  autopost?: boolean | StatcordAutopostingOptions
  /**
   * The amount of milliseconds to await a response from Statcord. Defaults to the core default (30 seconds).
   */
  httpTimeout?: number
  /**
   * Whether to enable debug mode and log debug messages. Defaults to false.
   */
  debug?: boolean
}
