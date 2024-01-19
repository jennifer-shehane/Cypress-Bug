import { defineComponent } from 'vue'
import { registerAsWebComponent } from './impl'

// TODO: vi.mock('vue') doesn't work because it replaces the vue module with a mocked one, which throws exceptions when trying to use it
vi.mock('vue', async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const vueActual = await vi.importActual('vue') as unknown as typeof import('vue')
  return {
    ...vueActual,
    defineCustomElement: vi.fn().mockReturnValue(HTMLElement)
  }
})

describe('registerAsWebComponent', () => {
  let customElementsDefineOriginal: typeof customElements.define

  beforeAll(() => {
    customElementsDefineOriginal = customElements.define
  })

  afterEach(() => {
    customElements.define = customElementsDefineOriginal
  })

  it('Should throw an exception if an element with the same tag name already exists', async () => {
    const tag = 'my-wysiwyg-3'
    await expect(registerAsWebComponent({
      tag,
      Component: defineComponent({ template: '<div>Hello, world!</div>' }),
      stylesStringified: [],
      vuePluginsWithStyles: []
    })).rejects.toThrow()
  })

  it('should define a custom element with the given tag and component', async () => {
    const tag = 'my-component'
    const Component = defineComponent({ template: '<div>Hello, world!</div>' })
    const stylesStringified = ['body { color: red; }']
    const vuePluginsWithStyles = [
      {
        vuePlugins: [],
        styles: ['h1 { font-size: 24px; }']
      }
    ]

    const { defineCustomElement } = await import('vue')
    const ExpectedCustomElementConstructor = class HTMLElementCustomConstructor extends HTMLElement {};
    (defineCustomElement as any).mockReturnValue(ExpectedCustomElementConstructor)

    const customElementsDefineMock = vi.fn()
    customElements.define = customElementsDefineMock
    expect(customElementsDefineMock).not.toHaveBeenCalled()

    await registerAsWebComponent({
      tag,
      Component,
      stylesStringified,
      vuePluginsWithStyles
    })

    expect(defineCustomElement).toHaveBeenCalledWith({
      ...Component,
      styles: [
        ...stylesStringified,
        ...vuePluginsWithStyles[0].styles
        // ...Component?.styles,
      ],
      setup: expect.any(Function)
    })

    expect(customElementsDefineMock).toHaveBeenCalledWith(tag, ExpectedCustomElementConstructor)
  })
})