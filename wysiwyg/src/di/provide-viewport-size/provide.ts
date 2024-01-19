import {
  type Ref, provide, computed, type ComputedRef
} from 'vue'
import { type ViewportSize } from '../../enums'
import type { ViewportBreakpoints } from '../../types'
import { calculateViewportBreakpointsStatus } from './calculate-viewport-breakpoints-status'
import {
  DITokenViewportSize, provideRootSizeValueDefault
} from './const'
import type { ProvideViewportSizeValue } from './types'

export function provideViewportSize (elementWidth: Ref<number>, breakpoints: Ref<ViewportBreakpoints>): void {
  const breakpointsArranged = computed(() => {
    const breakpointsValue = breakpoints.value
    return Object.entries(breakpointsValue).sort((a, b) => a[1] - b[1])
  }) as ComputedRef<Array<[ViewportSize, number]>>
  const currentBreakpoint: ComputedRef<ProvideViewportSizeValue> = computed(() => {
    const elementWidthValue = elementWidth.value
    return calculateViewportBreakpointsStatus({
      breakpointsArranged: breakpointsArranged.value,
      hostElementWidth: elementWidthValue,
      defaults: provideRootSizeValueDefault
    })
  })

  provide(DITokenViewportSize, currentBreakpoint)
}
