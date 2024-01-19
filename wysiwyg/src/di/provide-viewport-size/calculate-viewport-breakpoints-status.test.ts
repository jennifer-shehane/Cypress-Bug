import { breakpointsConfig } from '../../conf'
import {
  calculateViewportBreakpointsStatus, type CalculateViewportStatusParams 
} from './calculate-viewport-breakpoints-status'
import { provideRootSizeValueDefault } from './const'

const breakpointsArranged: CalculateViewportStatusParams['breakpointsArranged'] = Object.entries(breakpointsConfig).sort(([
  , a
], [
  , b
]) => a - b) as unknown as CalculateViewportStatusParams['breakpointsArranged']
const defaults = Object.freeze({ ...provideRootSizeValueDefault })

describe('calculateViewportBreakpointsStatus', () => {
  it.each(Object.entries(breakpointsConfig))('should return %p when hostElementWidth is %p', (viewportSize, hostElementWidth) => {
    expect(calculateViewportBreakpointsStatus({
      breakpointsArranged,
      hostElementWidth,
      defaults
    })).toEqual({
      ...defaults,
      [viewportSize]: true,
      viewportSize
    })
  })
})