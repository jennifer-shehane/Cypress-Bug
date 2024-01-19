import type { Editor } from '@tiptap/vue-3'
import { type Ref } from 'vue'
import { runEditorFocusChain } from './run-editor-focus-chain'


describe('runEditorFocusChain', () => {
  it('should call the focus method on the editor', () => {
    // Define a mock editor
    const editor = { value: { chain: vi.fn().mockReturnValue({ focus: vi.fn() }) } } as unknown as Ref<Editor>
    // Call the function with the mock editor
    runEditorFocusChain(editor)
    // Assert that the chain method was called on the editor
    expect(editor.value.chain).toHaveBeenCalled()
    // Assert that the focus method was called on the chain
    expect(editor.value.chain().focus).toHaveBeenCalled()
  })
})