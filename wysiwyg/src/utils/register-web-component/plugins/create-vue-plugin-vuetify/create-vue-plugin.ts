import { type VuetifyOptions } from 'vuetify'

// Import icon sets from Vuetify
import {
  aliases, fa
} from 'vuetify/iconsets/fa'
import type { RegisterWebComponentCreateVuePluginWithStyles } from '../../types'
import { loadVuetifyCSSBundlesAsStrings } from './load-css'

export const createVuePluginVuetify = async function createVuePluginVuetifyImpl(
  vuetifyOptions?: VuetifyOptions
): Promise<RegisterWebComponentCreateVuePluginWithStyles> {
  const [
    { createVuetify: createVuetifyInstance },
    components,
    directives,
    { VSkeletonLoader },
    cssStylesStringified
  ] = await Promise.all([
    import('vuetify'),
    import('vuetify/components'),
    import('vuetify/directives'),
    import('vuetify/labs/VSkeletonLoader'),
    loadVuetifyCSSBundlesAsStrings()
  ])
  const vuetifyPlugin = createVuetifyInstance({
    ...vuetifyOptions,
    components: {
      ...components,
      VSkeletonLoader,
      ...vuetifyOptions?.components
    },
    directives: {
      ...directives,
      ...vuetifyOptions?.directives
    },
    theme: {
      defaultTheme: 'light',
      ...vuetifyOptions?.theme
    },
    icons: {
      defaultSet: 'fa',
      ...vuetifyOptions?.icons,
      sets: {
        fa,
        ...vuetifyOptions?.icons?.sets
      },
      aliases: {
        ...aliases,
        ...vuetifyOptions?.icons?.aliases
      }
    }
  })
  return {
    styles: cssStylesStringified,
    vuePlugins: [vuetifyPlugin]
  }
}