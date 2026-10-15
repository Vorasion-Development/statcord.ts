import { Events, Listener, type MessageCommandAcceptedPayload } from '@sapphire/framework'

import { commands } from '../maps'

export class StatcordPluginMessageCommandAcceptedListener extends Listener<typeof Events.MessageCommandAccepted> {
  constructor(context: Listener.LoaderContext, options?: Listener.Options) {
    super(context, {
      ...options,
      name: 'PluginStatcordMessageCommandAccepted',
      event: Events.MessageCommandAccepted,
    })
  }

  public run({ command }: MessageCommandAcceptedPayload) {
    if (this.container.client.options.statcord?.debug)
      this.container.logger.debug(`[Statcord] Logging use of the ${command.name} message command`)

    const currentCommand = commands.get(command.name)

    if (currentCommand) currentCommand.count++
    else {
      if (this.container.client.options.statcord?.debug)
        this.container.logger.debug(`[Statcord] Command ${command.name} not found in the commands map, setting it...`)

      commands.set(command.name, { name: command.name, count: 1 })
    }
  }
}
