import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
  aliases, fa
} from 'vuetify/iconsets/fa'
import TipTapEditor from './TipTap.ce.vue'
import { registerAsWebComponent } from './utils/register-web-component/implementation/impl'
import { registerWebComponentWYSIWYG } from './index'

vi.mock('vuetify')
vi.mock('./utils/register-web-component/implementation/impl.ts')

describe('registerWebComponentWYSIWYG', () => {
  it('Creates a Vuetify plugin instance instantiated with the default parameters', async () => {
    const tag = 'my-wysiwyg'

    expect(createVuetify).not.toHaveBeenCalled()

    await registerWebComponentWYSIWYG(tag, undefined, undefined)

    expect(createVuetify).toHaveBeenCalledOnce()
    expect(createVuetify).toHaveBeenCalledWith(expect.objectContaining({
      components: expect.objectContaining({
        ...components,
        VSkeletonLoader: expect.objectContaining({})
      }),
      directives: expect.objectContaining({ ...directives }),
      theme: expect.objectContaining({ defaultTheme: 'light' }),
      icons: expect.objectContaining({
        defaultSet: 'fa',
        aliases,
        sets: expect.objectContaining({ fa })
      })
    }))
  })

  it('Creates a Vuetify plugin instance instantiated with the passed parameters merged with the default ones', async () => {
    const tag = 'my-wysiwyg-another'
    const vuetifyOptions = { 
      theme: { dark: true }, 
      components: { Component1: {} },
      directives: { Directive1: {} },
      icons: {
        aliases: { Alias1: {} },
        sets: { mdi: {} }
      }
    } as any
    const injectStyles = ['/* some other CSS */']

    expect(createVuetify).not.toHaveBeenCalled()

    await registerWebComponentWYSIWYG(tag, vuetifyOptions, injectStyles)

    expect(createVuetify).toHaveBeenCalledOnce()
    expect(createVuetify).toHaveBeenCalledWith(expect.objectContaining({
      components: expect.objectContaining({
        ...components,
        ...vuetifyOptions.components,
        VSkeletonLoader: expect.objectContaining({})
      }),
      directives: expect.objectContaining({
        ...directives,
        ...vuetifyOptions.directives
      }),
      theme: expect.objectContaining({ ...vuetifyOptions.theme }),
      icons: expect.objectContaining({
        ...vuetifyOptions.icons,
        aliases: expect.objectContaining({
          ...aliases,
          ...vuetifyOptions.icons.aliases
        }),
        sets: expect.objectContaining({
          fa,
          ...vuetifyOptions.icons.sets
        })
      })
    }))
  })

  it('Creates a Vuetify plugin instance instantiated and rewrites defaults with the passed parameters', async () => {
    const tag = 'my-wysiwyg-3'
    const vuetifyOptions = { 
      theme: { dark: true }, 
      components: { VBtn: {} },
      directives: { Mutate: {} },
      icons: {
        aliases: { close: 'mdi-close' },
        defaultSet: 'mdi',
        sets: { fa: {} }
      }
    } as any
    const injectStyles = ['/* some other CSS */']

    expect(createVuetify).not.toHaveBeenCalled()

    await registerWebComponentWYSIWYG(tag, vuetifyOptions, injectStyles)

    expect(createVuetify).toHaveBeenCalledOnce()
    expect(createVuetify).toHaveBeenCalledWith(expect.objectContaining({
      components: expect.objectContaining({ VBtn: vuetifyOptions.components.VBtn }),
      directives: expect.objectContaining({ Mutate: vuetifyOptions.directives.Mutate }),
      theme: expect.objectContaining({ ...vuetifyOptions.theme }),
      icons: expect.objectContaining({
        defaultSet: vuetifyOptions.icons.defaultSet,
        aliases: expect.objectContaining({ close: vuetifyOptions.icons.aliases.close }),
        sets: expect.objectContaining({ fa: vuetifyOptions.icons.sets.fa })
      })
    }))
  })

  it('Should invoke "registerAsWebComponent" with the correct parameters', async () => {
    const styles = ['/* some other CSS */']
    expect(registerAsWebComponent).not.toHaveBeenCalled()
    await registerWebComponentWYSIWYG('any-tag', undefined, styles)
    expect(registerAsWebComponent).toHaveBeenCalledWith(expect.objectContaining({
      tag: 'any-tag',
      Component: TipTapEditor,
      stylesStringified: expect.arrayContaining(styles),
      vuePluginsWithStyles: expect.any(Array)
    }))
  })
})