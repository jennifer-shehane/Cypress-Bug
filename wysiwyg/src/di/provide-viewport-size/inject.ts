import {
  inject, ref, type Ref 
} from 'vue'
import {
  DITokenViewportSize, provideRootSizeValueDefault 
} from './const'
import type { ProvideViewportSizeValue } from './types'

export function injectViewportSize (): Ref<ProvideViewportSizeValue> {
  const provideRootSizeValueDefaultRef = ref(provideRootSizeValueDefault)
  return inject(DITokenViewportSize, provideRootSizeValueDefaultRef)
}
