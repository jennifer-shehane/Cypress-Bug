import type {
  ChainedCommands, Editor 
} from '@tiptap/vue-3'
import type { Ref } from 'vue'

/**
 * This function runs a chain of commands to focus the editor.
 * 
 * @param editor - the TipTap editor instance
 * @returns - the chained commands to focus the editor
 */
export const runEditorFocusChain = (editor: Ref<Editor>): ChainedCommands => (
  editor.value.chain().focus()
)
