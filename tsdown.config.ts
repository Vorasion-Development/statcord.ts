import { defineConfig } from 'tsdown'

export default defineConfig({
  attw: {
    profile: 'esm-only',
    level: 'error',
  },
  publint: {
    level: 'error',
  },
  dts: true,
  exports: true,
})
