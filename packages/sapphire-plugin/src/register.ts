import './index'
import { container, Plugin, postInitialization, postLogin, SapphireClient } from '@sapphire/framework'
import { Time } from '@sapphire/timestamp'
import { Statcord } from '@statcord-ts/core'

import { postStats } from './lib/postStats'
import { loadListeners } from './listeners/load'

export class StatcordPlugin extends Plugin {
  public static override [postInitialization](this: SapphireClient) {
    loadListeners()
  }

  public static override [postLogin](this: SapphireClient) {
    container.statcord = new Statcord(this.user!.id, this.options.statcord?.apiKey, this.options.statcord?.httpTimeout)
    const statcordAutoposting = this.options.statcord?.autopost

    if ((typeof statcordAutoposting === 'object' && statcordAutoposting?.enabled) || statcordAutoposting === true)
      setInterval(
        () => void postStats(),
        typeof statcordAutoposting === 'object' ? (statcordAutoposting?.interval ?? Time.Minute) : Time.Minute,
      )
  }
}

SapphireClient.plugins.registerPostInitializationHook(StatcordPlugin[postInitialization], 'Statcord-PostInitialization')
SapphireClient.plugins.registerPostLoginHook(StatcordPlugin[postLogin], 'Statcord-PostLogin')
