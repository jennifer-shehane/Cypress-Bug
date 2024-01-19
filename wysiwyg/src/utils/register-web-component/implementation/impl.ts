import { 
  defineCustomElement, 
  h, 
  createApp,
  getCurrentInstance
} from 'vue'

import type {
  RegisterAsWebComponent,
  RegisterAsWebComponentOptions
} from '../types'

/**
 *  Function to register a Vue component as a web component
 *  https://rimdev.io/vue-3-custom-elements/
 *  https://codesandbox.io/p/github/amirtbi/vue-webcomponent/main?file=/src/web-component.ts:174,14
 *  https://github.com/vuetifyjs/vuetify/issues/16558#issuecomment-1416378717
 * 
 */
export const registerAsWebComponent: RegisterAsWebComponent = async function registerAsWebComponentImpl (
  options: RegisterAsWebComponentOptions
): Promise<void> {
  const {
    tag,
    Component,
    stylesStringified,
    vuePluginsWithStyles
  } = options
  const vuePluginStyles = vuePluginsWithStyles?.flatMap(({ styles }) => styles) ?? []
  // TODO: https://github.com/vuejs/vue-web-component-wrapper/issues/97 -
  // "defineCustomElement" always creates a shadow root in the open mode.
  // If override the open mode to closed (eg. in "attachShadow"), Vue throws exceptions
  /**
   * Create the web component constructor.
   */
  const WebComponentConstructor = defineCustomElement({
    ...Component,
    styles: [
      ... stylesStringified ?? [],
      ...vuePluginStyles,
      ...Component.styles ?? []
    ],
    setup (props: any, other?: any) {
      const app = createApp(Component)
      
      const plugins = vuePluginsWithStyles?.flatMap(({ vuePlugins }) => vuePlugins) ?? []
      // install plugins
      plugins.forEach(app.use)
      const inst = getCurrentInstance()

      if (inst == null) {
        throw new Error('No current instance')
      }

      Object.assign(inst.appContext, app._context)
      Object.assign((inst as any).provides, app._context.provides)
      
      // If the component has a setup function, call it with the props
      if (typeof Component.setup === 'function') {
        return Component.setup(props, other ?? {})
      }
      return function render (this: any) {
        return h(
          Component,
          {
            ...this.$props,
            ...this.$attrs,
            ...this.$slots 
          }
        )
      }
    }
  })

  customElements.define(tag, WebComponentConstructor)
}
