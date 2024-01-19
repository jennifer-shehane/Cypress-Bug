import {
  onMounted, ref, watch, type Ref 
} from 'vue'

/**
 * This hook returns the element in the shadow DOM which is assigned to the slot element.
 * 
 * @param slotElementRef - the ref of the slot element. 
 * The slot element is the element in the DOM which is the parent of the shadow DOM.
 * @returns - the element in the shadow DOM which is assigned to the slot element. 
 */
export function useSlotAssignedElement (
  slotElementRef: Ref<HTMLSlotElement | null>
): Ref<HTMLElement | undefined> {
  const refSlotAssignedElement = ref<HTMLElement | undefined>(undefined)

  const readAndSetSlotAssignedElementFromSlotRef = (): typeof refSlotAssignedElement | undefined => {
    if (slotElementRef.value == null) {
      return
    }
        
    const element = slotElementRef.value.assignedElements()[0]
    
    if (element === undefined) return
    refSlotAssignedElement.value = element as HTMLElement
  }
  onMounted(readAndSetSlotAssignedElementFromSlotRef)
  watch(slotElementRef, readAndSetSlotAssignedElementFromSlotRef)
  return refSlotAssignedElement
}
