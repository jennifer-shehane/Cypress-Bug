import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import type { EditorOptions } from '@tiptap/vue-3'
import {
  TableCellColumnWidthSupport,
  CustomTable,
  FontSize
} from '../extensions'

export const optionsTipTapEditorTableResizable = false

// The default options for the TipTap editor.
export const optionsTipTapEditor: Partial<EditorOptions> = {
  // https://tiptap.dev/api/editor
  editorProps: { attributes: { class: 'h-100 w-100' } }, // display the editor as a full screen element
  // https://tiptap.dev/api/extensions
  extensions: [
    StarterKit,
    TextStyle,
    CustomTable.configure({ resizable: optionsTipTapEditorTableResizable }),
    TableRow,
    TableHeader,
    TableCellColumnWidthSupport,
    // https://www.reddit.com/r/reactjs/comments/1377qht/creating_a_link_using_tiptap/
    Link.extend({ inclusive: false }).configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: '...' }),
    TextAlign.configure({
      types: [
        'heading',
        'paragraph',
        'tableCell'
      ],
      defaultAlignment: ''
    }),
    FontSize
  ]
}
