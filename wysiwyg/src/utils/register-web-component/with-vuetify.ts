import type { VuetifyOptions } from 'vuetify'
import type { RegisterAsWebComponent } from './types'

/**
 * Function to register a Vue component as a web component
 * and inject a Vuetify Vue plugin.
 * 
 * @param vuetifyOptions - Options to pass to Vuetify Vue plugin
 * @returns 
 */
export function registerAsWebComponentWithVuetify (vuetifyOptions?: VuetifyOptions): RegisterAsWebComponent {
  return async (
    options: Parameters<RegisterAsWebComponent>[0]
  ): Promise<void> => {
    const [
      { registerAsWebComponent },
      { createVuePluginVuetify }
    ] = await Promise.all([
      import('./implementation'),
      import('./plugins')
    ])
    const vuetifyPlugin = await createVuePluginVuetify(vuetifyOptions)
    return await registerAsWebComponent({
      ...options,
      vuePluginsWithStyles: [
        ...options.vuePluginsWithStyles ?? [],
        vuetifyPlugin
      ]
    })
  }
}