import {
  computed, type Ref 
} from 'vue'
import {
  injectViewportSize, type ProvideViewportSizeValue 
} from '../di'
import type {
  ComponentSize, ViewportSize 
} from '../enums'

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type UseResponsiveComponentSizeConfiguration = Partial<Record<ViewportSize, ComponentSize>>

/**
 * The hook returns the component size based on the viewport size.
 * 
 * @param configuration - the configuration for the component size
 * @param defaultComponentSize - the default component size 
 * @returns - the component size
 */
export function useResponsiveComponentSize (
  configuration: UseResponsiveComponentSizeConfiguration,
  defaultComponentSize: ComponentSize
): Ref<ComponentSize> {
  const viewportSizeRef: Ref<ProvideViewportSizeValue> = injectViewportSize()
  const componentSize = computed(() => {
    const viewportSize = viewportSizeRef.value.viewportSize
    const componentSize = configuration[viewportSize]
    return componentSize ?? defaultComponentSize
  })
  return componentSize
}