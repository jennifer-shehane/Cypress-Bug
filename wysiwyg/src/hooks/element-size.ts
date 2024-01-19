import {
  type Ref, 
  watch,
  ref 
} from 'vue'

/**
 * Element size.
 */
export interface UseElementSizeReturn {
  width: Ref<number>
  height: Ref<number>
}

/**
 * Tracks the size of an element.
 * https://medium.com/@ankurr.singhal/create-your-own-custom-vue-hooks-useelementsize-d20d6a73aef5
 * 
 * @param element - Element to observe.
 * @returns - Element size.
 */
export function useElementSize (element: Ref<HTMLElement | undefined>): UseElementSizeReturn {
  // TODO: write a test for this hook
  const width = ref(0)
  const height = ref(0)

  let observerOrNull: ResizeObserver | null = null
     
  function disconnect (): void {
    if (observerOrNull !== null) {
      observerOrNull.disconnect()
      observerOrNull = null
    }
  }
  
  function connect (element: HTMLElement): void {
    disconnect()
    observerOrNull = new ResizeObserver((entries) => {
      const rectOrUndefined: DOMRectReadOnly | undefined = entries[0]?.contentRect
      if (!Boolean(rectOrUndefined)) {
        return
      }
      width.value = rectOrUndefined.width
      height.value = rectOrUndefined.height
    })
    observerOrNull.observe(element)
  }

  watch(
    element,
    (el) => {
      if (el != null) connect(el)
      else disconnect()
    }
  )
    
  return {
    width,
    height
  }
}
