import type { SpyInstance } from 'vitest'
import {
  type Ref, provide, computed 
} from 'vue'
import { breakpointsConfig } from '../../conf'
import {
  DITokenViewportSize, provideRootSizeValueDefault 
} from './const'
import { provideViewportSize } from './provide'

const defaults = Object.freeze({ ...provideRootSizeValueDefault })

vi.mock('vue')

describe('calculateViewportBreakpointsStatus', () => {
  beforeEach(() => {
    (computed as any as SpyInstance).mockImplementation((fn) => {
      return { value: fn() }
    })
  })

  it.each(Object.entries(breakpointsConfig))('should return %p when hostElementWidth is %p', (viewportSize, hostElementWidth) => {
    expect(provide).not.toHaveBeenCalled()
    provideViewportSize({ value: hostElementWidth } as unknown as Ref, { value: breakpointsConfig } as unknown as Ref)
    expect(provide).toHaveBeenCalledWith(
      DITokenViewportSize,
      expect.objectContaining({
        value: expect.objectContaining(
          {
            ...defaults,
            [viewportSize]: true,
            viewportSize
          }
        )
      })
    )
  })
})