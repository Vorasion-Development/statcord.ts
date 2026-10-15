import { defineConfig } from 'vitest/config'

import baseConfig from './vitest-base.config.ts'

export default defineConfig({
  test: {
    ...baseConfig.test,
    projects: ['packages/*'],
  },
})
