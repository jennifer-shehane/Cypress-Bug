import { ViewportSize } from '../enums'
import type { ViewportBreakpoints } from '../types'

// https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints
// https://v2.vuetifyjs.com/en/features/breakpoints/#breakpoint-service
export const breakpointsConfig: ViewportBreakpoints = Object.freeze({
  [ViewportSize.XS]: 600,
  [ViewportSize.SM]: 960,
  [ViewportSize.MD]: 1264,
  [ViewportSize.LG]: 1904,
  [ViewportSize.XL]: Infinity
})
  