import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import type { EnhanceAppContext } from 'vitepress'

// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import '@catppuccin/vitepress/theme/mocha/green.css'
// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import 'virtual:group-icons.css'
// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import '@shikijs/vitepress-twoslash/style.css'

import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  },
}
