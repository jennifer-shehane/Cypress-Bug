import {
  getCurrentInstance, ref, onMounted, type Ref 
} from 'vue'

/**
 * The hook returns the host element of the component.
 * Web components are encapsulated in a shadow DOM.
 * The host element is the element in the DOM which is the parent of the shadow DOM.
 * 
 * @returns the host element of the component
 */
export function useHostElement (): Ref<HTMLElement | null> {
  const host = ref(null)
  onMounted(() => {
    host.value = getCurrentInstance()?.proxy?.$el?.parentNode?.host
  })
  return host
}