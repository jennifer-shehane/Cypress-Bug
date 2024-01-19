import { ref } from 'vue'
import { useComponentElementRef } from './component-element-ref'

describe('useComponentElementRef', () => {
  it('should return a ref with an initial value of undefined', () => {
    const componentInstanceRef = ref(undefined)
    const elementRef = useComponentElementRef(componentInstanceRef)
    expect(elementRef.value).toBeUndefined()
  })

  it('should update the elementRef value when the componentInstanceRef changes', async () => {
    const divElement = document.createElement('div')
    const componentInstanceRef = ref({ $el: divElement })
    const elementRef = useComponentElementRef(componentInstanceRef)
    expect(elementRef.value).toBe(divElement)

    const newDivElement = document.createElement('div')
    componentInstanceRef.value = { $el: newDivElement }
    await vi.waitUntil(() => elementRef.value === newDivElement)
    expect(elementRef.value).toBe(newDivElement)
  })

  it('should set the elementRef value to undefined if the componentInstanceRef is null or undefined', async () => {
    const componentInstanceRef = ref<{ $el: HTMLElement } | undefined>({ $el: document.createElement('div') })
    const elementRef = useComponentElementRef(componentInstanceRef)
    expect(elementRef.value).toBeDefined()

    componentInstanceRef.value = null as unknown as undefined
    await vi.waitUntil(() => elementRef.value === undefined)
    expect(elementRef.value).toBeUndefined()

    componentInstanceRef.value = undefined
    await vi.waitUntil(() => elementRef.value === undefined)
    expect(elementRef.value).toBeUndefined()
  })
})