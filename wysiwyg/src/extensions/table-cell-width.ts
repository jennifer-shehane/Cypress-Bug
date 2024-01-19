import type { NodeConfig } from '@tiptap/core'
import TableCell, { type TableCellOptions } from '@tiptap/extension-table-cell'
import { mergeAttributes } from '@tiptap/vue-3'

import { sumUpNumbers } from '../utils'
import { mergeCSSStyleTextDeclarations } from './utils'

type ColWidthAttributeValue = [number] | null

/**
 * This function participates in the parsing of the "colwidth" non-standard HTML attribute 
 * that is used by TipTap to define the width of a table column.
 * 
 * @param colwidth - the value of the "colwidth" attribute.
 * @returns {number | null} - the total width of the column, in pixels, or null if the "colwidth" attribute is not defined.
 */
export const parseColWidthAttributeValue = (colwidth: string): number | null => {
  // sum up the numbers in the colwidth attribute to get the width of the column
  const splitValues = colwidth.split(',')
  const filteredValues = splitValues.filter(Boolean)
  if (filteredValues.length === 0) {
    return null
  }
  const numericValue: number = sumUpNumbers(filteredValues.map(parseFloat))
  return numericValue
}

/**
 * Read the attribute and return the total width of the column, in pixels in the TipTap format.
 * 
 * @param tableTDElement - a table TD element.
 * @returns returns the total width of the column, in pixels.
 */
export function readColWidthAttributeValueFromHTMLElement (tableTDElement: HTMLElement): ColWidthAttributeValue {
  const colwidth: string | null = tableTDElement.getAttribute('colwidth')
  const value: number | null = colwidth != null
    ? parseColWidthAttributeValue(colwidth) // the "colwidth" attribute is measured in pixels
    : null
   
  return value != null ? [value] : null
}

/**
 * TipTap sets "colwidth" attribute to define the width of a table column in pixels.
 * This is a non-standard attribute, which is not supported by the HTML specification.
 * This function saves the "colwidth" attribute to the HTML element styles to save the colum width
 * and make the table implementation work consistently with the table implementation in the old editor
 * and the rendering of the table in the browser.
 * 
 * @param options 
 * @returns 
 */
export const renderColHTMLFromOptions: Exclude<NodeConfig<TableCellOptions>['renderHTML'], null | undefined> = function renderColHTMLFromOptionsImpl (options) {
  const { HTMLAttributes } = options
  const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
  const colWidthAttr: ColWidthAttributeValue = attrs.colwidth
  let widthValue = 0

  if (colWidthAttr != null) {
    widthValue = sumUpNumbers(colWidthAttr)
  }
  attrs.style =  mergeCSSStyleTextDeclarations(
    attrs.style ?? '',
    widthValue > 0
      ? `width: ${widthValue}px`
      : ''
  )
  return [
    'td',
    attrs,
    0
  ]
}

/**
 * Returns the CSS style text of a DOM element.
 * This is necessary to read style attributes from the table element to make the table
 * implementation work consistently with the table implementation in the old editor.
 * 
 * @param el - a DOM element.
 * @returns the CSS style text of the DOM element.
 */
export function parseHTML (el: HTMLElement): string {
  return el.style.cssText
} 

// TODO: TipTap doesn't support saving the column width to the HTML element styles.
// https://github.com/ueberdosis/tiptap/issues/2041
// https://github.com/ueberdosis/tiptap/issues/4105
export const TableCellColumnWidthSupport = TableCell
  .extend({
    renderHTML: renderColHTMLFromOptions,
    addAttributes () {
      return {
        ...this.parent?.(),
        style: {
          default: '',
          parseHTML
        },
        colwidth: {
          default: null,
          parseHTML: readColWidthAttributeValueFromHTMLElement,
          style: { default: null }
        }
      }
    }
  })
