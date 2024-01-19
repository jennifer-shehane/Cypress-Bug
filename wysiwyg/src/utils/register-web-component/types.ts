import type { Plugin } from 'vue'

export interface RegisterWebComponentCreateVuePluginWithStyles {
  styles: string[]
  vuePlugins: Plugin[]
}

/**
 * Options for registering a component as a web component.
 */
export interface RegisterAsWebComponentOptions {
  /**
     * The tag name for the web component.
     */
  tag: string
  /**
     * The component to register as a web component.
     */
  Component: any
  /**
     * An optional array of CSS styles to apply to the web component.
     */
  stylesStringified?: string[]
  /**
     * An optional array of Vue plugins with styles to apply to the web component.
     */
  vuePluginsWithStyles?: RegisterWebComponentCreateVuePluginWithStyles[]
}

export type RegisterAsWebComponent = (
  options: RegisterAsWebComponentOptions
) => Promise<void>