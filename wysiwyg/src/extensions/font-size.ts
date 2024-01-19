import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export interface FontSizeOptions {
  types: string[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType
    }
  }
}

/**
 * This TipTap extension adds the "setFontSize" and "unsetFontSize" commands to the editor.
 * To check if the font size is set, use the `tiptapEditorInstance.isActive('textStyle', { fontSize }) === true`.
 */
export const FontSize = Extension.create<FontSizeOptions>({
  // TODO: Editor throws "Schema is missing its top node type ('doc')" in unit tests https://github.com/remirror/remirror/issues/180
  name: 'fontSize',

  addOptions () {
    return { types: ['textStyle'] }
  },

  addGlobalAttributes () {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (attributes.fontSize == null) {
                return {}
              }

              return { style: `font-size: ${attributes.fontSize}` }
            }
          }
        }
      }
    ]
  },

  addCommands () {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      }
    }
  }
})