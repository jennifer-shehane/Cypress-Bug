import type { Editor } from '@tiptap/vue-3'
import type { WithCheckIfActive } from 'src/types'
import {
  ref, type Ref 
} from 'vue'
import { useOnTransaction } from './on-transaction'

/**
 * This hook filters a list of options which implement the WithCheckIfActive interface.
 * The list is filtered by the checkIfActive function of the options.
 * 
 * @param editor - the TipTap editor instance
 * @param listWithCheckIfActive - the list of options to filter
 * @returns - the filtered list of options which are active 
 */
export const useFilterActive = <T extends WithCheckIfActive<unknown>>( 
  editor: Ref<Editor>,
  listWithCheckIfActive: Ref<T[]>
): typeof listWithCheckIfActive => {
  const refActive = ref([]) as typeof listWithCheckIfActive

  const checkIfActive = (option: T): boolean => option.checkIfActive(editor.value)
  const filterActiveOnTransaction = (): void => {
    refActive.value = listWithCheckIfActive.value.filter(checkIfActive)
  }

  useOnTransaction(editor, filterActiveOnTransaction)
  return refActive
}