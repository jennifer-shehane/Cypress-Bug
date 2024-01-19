import {
  watch, ref, type Ref 
} from 'vue'
import type { VueComponentInstanceRef } from './types'

export function useComponentElementRef (vueComponentInstanceRef: VueComponentInstanceRef): Ref<HTMLElement | undefined> {
  const elementRef: Ref<HTMLElement | undefined> = ref(vueComponentInstanceRef.value?.$el ?? undefined)
    
  watch(vueComponentInstanceRef, (componentRefOrNull): void => {
    elementRef.value = componentRefOrNull?.$el ?? undefined
  })

  return elementRef
}