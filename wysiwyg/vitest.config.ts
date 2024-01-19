import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      // https://github.com/vitest-dev/vitest/blob/main/test/global-setup/vitest.config.ts
      name: 'vitest-plugins-after-all',
      config: () => ({
        test: {
          setupFiles: [
            './vitest-setup/after-all/reset-mocks.ts',
            './vitest-setup/after-all/use-real-timers.ts'
          ]
        }
      })
    }
  ],
  test: {
    mockReset: true,
    // https://github.com/vitest-dev/vitest/issues/3862#issuecomment-1662483406
    // This is a hack to address a Vitest throws exception when trying to load the Vuetify CSS
    css: { include: /.+/ },
    globals: true,
    environment: 'jsdom', // TODO: doesn't support ShadowDOM yet https://github.com/testing-library/jest-dom/issues/340
    deps: {
      inline: ['vuetify'], // TODO: https://github.com/vitest-dev/vitest/issues/3524, event though this option is deprecated and the recommended way is to use the `optimizer` option, it doesn't work
      optimizer: { web: { include: ['vuetify'] } }
    }
  }
})
