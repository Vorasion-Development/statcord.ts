import { Time } from '@sapphire/timestamp'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
    },
    environment: 'node',
    globals: true,
    passWithNoTests: true,
        reporters: ['html', ...configDefaults.reporters],
    testTimeout: Time.Minute,
    typecheck: {
      enabled: true,
    },
    ui: true,
  },
})
