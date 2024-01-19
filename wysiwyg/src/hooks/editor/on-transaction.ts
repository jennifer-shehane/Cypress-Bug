import type { Editor } from '@tiptap/vue-3'
import {
  onMounted, onUnmounted, type Ref 
} from 'vue'
import { debounceRequestAnimationFrame } from '../../utils'

/**
 * This hook calls the onEditorTransactionHandler if any change with the content happens 
 * in the editor.
 * https://tiptap.dev/api/events#transaction
 * 
 * @param editor - the TipTap editor instance
 * @param onEditorTransactionHandler - the handler to call on transaction
 */
export const useOnTransaction = (
  editor: Ref<Editor>,
  onEditorTransactionHandler: () => void
): void => {
  const onEditorTransactionHandlerDebounced = debounceRequestAnimationFrame(onEditorTransactionHandler)

  onMounted(() => {
    onEditorTransactionHandlerDebounced()
    editor.value.on('transaction', onEditorTransactionHandlerDebounced)
  })

  onUnmounted(() => {
    editor.value.off('transaction', onEditorTransactionHandlerDebounced)
  })
}
