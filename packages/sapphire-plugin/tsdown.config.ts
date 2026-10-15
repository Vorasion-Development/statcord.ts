import { defineConfig } from 'tsdown'
import baseConfig from '../../tsdown.config'

export default defineConfig({
  ...baseConfig,
  entry: {
    index: 'src/index.ts',
    register: 'src/register.ts'
  },
})
