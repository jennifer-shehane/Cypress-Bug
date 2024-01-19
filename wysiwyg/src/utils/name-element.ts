import { TEST_UNIQUE_NAME_PREFIX } from '../conf'

export enum ElementType {
  BUTTON = 'btn',
  INPUT_ELEMENT = 'inp',
  SELECT_CONTAINER = 'sel',
  DIALOG_CONTAINER = 'dlg',
  CONTAINER = 'div',
  TOOLTIP_CONTAINER = 'tltp'  
}

/**
 * Gives a globally unique name to a DOM element.
 * 
 * @param name - a globally unique name of the element
 * @param elementTypeName - the type of the element
 * @returns 
 */
export function nameDOMElement (
  name: string,
  elementTypeName: ElementType = ElementType.BUTTON): string {
  return `${TEST_UNIQUE_NAME_PREFIX}_${elementTypeName}_${name}`
}
