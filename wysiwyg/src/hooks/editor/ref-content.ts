import type { Editor } from '@tiptap/vue-3'
import {
  watch, type Ref 
} from 'vue'

/**
 * This hook sets the content of the editor to the value of the ref.
 * 
 * @param editor - the TipTap editor instance
 * @param ref - the ref of the content to set in the editor
 */
export function useRefContent (editor: Ref<Editor | undefined>, ref: Ref<string | undefined>): void {
  watch(ref, (contentText: string | undefined): void => {
    if (contentText == null || editor.value == null) return
    editor.value.commands.setContent(contentText)
  })
}
