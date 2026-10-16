import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { withMermaid as defineConfig } from 'vitepress-mermaid-viewer'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import typedocSidebar from '../api/typedoc-sidebar.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Statcord.ts',
  description: 'Take control over the stats of your bot',
  markdown: {
    // @ts-expect-error The types might be way out of wack right now.
    codeTransformers: [transformerTwoslash()],
    config(md) {
      md.use(groupIconMdPlugin)
    },
    lineNumbers: true,
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  },
  mermaid: {},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'API', link: '/api' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'API',
        items: typedocSidebar,
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Vorasion-Development/statcord.ts' }],
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
})
