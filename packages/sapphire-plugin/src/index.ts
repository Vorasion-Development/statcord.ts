import './maps' // Initialize the maps
import type { Statcord } from '@statcord-ts/core'
import type { StatcordPluginOptions } from '@statcord-ts/plugin-options'

declare module '@sapphire/pieces' {
  interface Container {
    statcord: Statcord
  }
}

declare module 'discord.js' {
  interface ClientOptions {
    statcord?: StatcordPluginOptions
  }
}
