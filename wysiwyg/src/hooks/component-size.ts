import { type Ref } from 'vue'
import { useComponentElementRef } from './component-element-ref'
import { useElementSize } from './element-size'
import type { VueComponentInstanceRef } from './types'

/**
 * This hook is a wrapper around useElementSize with the purpose of tracking the size of a Vue3 component.
 * 
 * @param vueComponentInstanceRef - this.$refs.componentRef
 * @returns size - the size of the component
 * size.width: Ref<number>
 * size.height: Ref<number>
 */
export function useComponentSize (vueComponentInstanceRef: VueComponentInstanceRef): ReturnType<typeof useElementSize> {
  const rootElementRef: Ref<HTMLElement | undefined> = useComponentElementRef(vueComponentInstanceRef)
  
  return useElementSize(rootElementRef)
}