import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import '@catppuccin/vitepress/theme/mocha/green.css'

// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import 'virtual:group-icons.css'

// @ts-expect-error CSS module import, TypeScript doesn't understand CSS modules right now
import '@shikijs/vitepress-twoslash/style.css'

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  }
}
