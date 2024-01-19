import { ViewportSize } from '../../enums'
import type { ProvideViewportSizeValue } from './types'

export interface CalculateViewportStatusParams {
  /**
   * Array of breakpoints arranged from smallest to largest.
  */
  breakpointsArranged: Array<[ViewportSize, number]>
  /**
   * Width of the host element.
   */
  hostElementWidth: number
  /**
   * Default value.
   */
  defaults: ProvideViewportSizeValue
}

/**
 * Calculates the current viewport status.
 * 
 * @param {CalculateViewportStatusParams} params - Parameters.
 * @returns {ProvideViewportSizeValue} Current viewport status.
 */
export function calculateViewportBreakpointsStatus (params: CalculateViewportStatusParams): ProvideViewportSizeValue {
  const {
    breakpointsArranged,
    hostElementWidth: hostElementWidthValue,
    defaults: provideRootSizeValueDefault
  } = params
  let currentBreakpointOrNull: ViewportSize | null = null
  const value = breakpointsArranged.reduce<ProvideViewportSizeValue>((acc, [
    size,
    width
  ]) => {
    if (currentBreakpointOrNull == null && hostElementWidthValue <= width) {
      currentBreakpointOrNull = size
      acc[size] = true
    } else {
      acc[size] = false
    }
    return acc
  }, { ...provideRootSizeValueDefault })
  return {
    ...value,
    [ViewportSize.XL]: currentBreakpointOrNull == null || ViewportSize.XL === currentBreakpointOrNull,
    viewportSize: currentBreakpointOrNull ?? provideRootSizeValueDefault.viewportSize
  }
}