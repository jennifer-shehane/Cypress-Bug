import { injectViewportSize } from '../di'
import {
  ComponentSize, ViewportSize 
} from '../enums'
import { useResponsiveComponentSize } from './responsive-component-size'

vi.mock('../di')

describe('useResponsiveComponentSize', () => {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const configuration: Partial<Record<ViewportSize, ComponentSize>> = Object.freeze({
    [ViewportSize.XS]: ComponentSize.XS,
    [ViewportSize.SM]: ComponentSize.XS,
    [ViewportSize.XL]: ComponentSize.LG
  })

  const defaultComponentSize = ComponentSize.SM

  it.each(Object.entries(configuration))('should return %p when viewportSize is %p', (viewportSize, expectedComponentSize) => {
    (injectViewportSize as any).mockImplementation(() => {
      return { value: { viewportSize } }
    })
    const componentSize = useResponsiveComponentSize(configuration, defaultComponentSize as ComponentSize)
    expect(componentSize.value).toBe(expectedComponentSize)
  })
})