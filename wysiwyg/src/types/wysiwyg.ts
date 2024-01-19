import type { Editor } from '@tiptap/vue-3'

export type WithCheckIfActive<C> = C & {
  /**
   * Method to check if the node is active.
   * 
   * @param editor - The editor instance
   * @returns - Whether the node is active
   */
  checkIfActive: (editor: Editor) => boolean
}
