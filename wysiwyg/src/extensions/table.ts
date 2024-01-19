import Table from '@tiptap/extension-table'
import type { Node } from '@tiptap/pm/model'
import {
  tableEditing, 
  columnResizing,
  TableView
} from '@tiptap/pm/tables'

import {
  cloneCSSStyleDeclaration,
  mergeCSSStyleTextDeclarations 
} from './utils'

function createCSSStyleDeclaration (styleStringified: string): CSSStyleDeclaration {
  const clonedStyle = document.createElement('table').style
  // TODO: https://bugs.chromium.org/p/chromium/issues/detail?id=1218159 "cssText" isn't always updated correctly
  clonedStyle.cssText = styleStringified
  return clonedStyle
}

function getMinWidthInPixelsOrNull (tableStyleDeclaration: CSSStyleDeclaration): number | null {
  const currentMinWidth = tableStyleDeclaration.minWidth
  const currentMinWidthNumber = currentMinWidth.length === 0 ? null : parseFloat(currentMinWidth)
  return currentMinWidthNumber
}

// https://github.com/ProseMirror/prosemirror-tables/blob/master/src/tableview.ts#L8
class CustomTableView extends TableView {
  protected _initialCSSStyleDeclaration: CSSStyleDeclaration

  protected _prevMinWidth: number | null = null

  constructor (node: Node, cellMinWidth: number) {
    super(node, cellMinWidth)
    this._initialCSSStyleDeclaration = createCSSStyleDeclaration(node.attrs.style)

    const table = this.table
    // override the applied with the elements initial styles if they overlap
    table.style.cssText = mergeCSSStyleTextDeclarations(table.style.cssText, this._initialCSSStyleDeclaration.cssText)
  }

  update (node: Node): boolean {
    if (!super.update(node)) {
      return false
    }

    const tableCSSDeclaration = this.table.style
    this._resetInitialCSSWidth(tableCSSDeclaration)
    
    const tableCSSDeclarationMergedWithInitial = this._mergeWithInitialStyles(tableCSSDeclaration)

    tableCSSDeclaration.cssText = tableCSSDeclarationMergedWithInitial.cssText // batch update of css styles
    return true
  }

  protected _mergeWithInitialStyles (tableStyleDeclaration: CSSStyleDeclaration): CSSStyleDeclaration {
    const clonedStyle = cloneCSSStyleDeclaration(tableStyleDeclaration)
    clonedStyle.cssText = mergeCSSStyleTextDeclarations(this._initialCSSStyleDeclaration.cssText, clonedStyle.cssText) // override the old styles with the new styles
    return clonedStyle
  }

  protected _resetInitialCSSWidth (tableStyleDeclaration: CSSStyleDeclaration): void {
    const currentMinWidthNumber: number | null = getMinWidthInPixelsOrNull(tableStyleDeclaration)
    if (currentMinWidthNumber != null && this._prevMinWidth != null && currentMinWidthNumber !== this._prevMinWidth) {
      // unset the initial width to allow the table to shrink/expand
      this._initialCSSStyleDeclaration.removeProperty('width')
    }
    this._prevMinWidth = currentMinWidthNumber
  }
}

export const CustomTable = Table.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      style: { default: 'width: 100%; table-layout: fixed' } // The new table will be 100% wide by default. Columns will have equal width.
    }
  },
  // https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-table/src/table.ts#L115C3-L133C4
  addProseMirrorPlugins () {
    const isResizable = this.options.resizable && this.editor.isEditable

    return [
      ...(isResizable
        ? [
            columnResizing({
              handleWidth: this.options.handleWidth,
              cellMinWidth: this.options.cellMinWidth,
              View: CustomTableView,
              lastColumnResizable: this.options.lastColumnResizable
            })
          ]
        : []),
      tableEditing({ allowTableNodeSelection: this.options.allowTableNodeSelection })
    ]
  }
})
