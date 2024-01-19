import type { Editor } from '@tiptap/vue-3'
import type { WithCheckIfActive } from 'src/types'

/**
 * A utility function to check if an option is active.
 * 
 * @param option - the option to check if active
 * @param editor - the TipTap editor instance
 * @returns - true if the option is active, false otherwise
 */
export const checkIfActive = (
  option: WithCheckIfActive<unknown>,
  editor: Editor
): boolean => option.checkIfActive(editor)

