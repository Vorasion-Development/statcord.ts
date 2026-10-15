import { container } from '@sapphire/pieces'

import { StatcordPluginChatInputCommandAcceptedListener } from './PluginChatInputCommandAccepted'
import { StatcordPluginMessageCommandAcceptedListener } from './PluginMessageCommandAccepted'

export function loadListeners() {
  const store = 'listeners' as const
  void container.stores.loadPiece({
    name: 'PluginStatcordChatInputCommandAccepted',
    piece: StatcordPluginChatInputCommandAcceptedListener,
    store,
  })
  void container.stores.loadPiece({
    name: 'PluginStatcordMessageCommandAccepted',
    piece: StatcordPluginMessageCommandAcceptedListener,
    store,
  })
}
