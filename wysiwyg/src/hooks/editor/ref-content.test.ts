import type { Editor } from '@tiptap/vue-3'
import {
  type Ref, ref 
} from 'vue'
import { useRefContent } from './ref-content'

describe('useRefContent', () => {
  let editor: Ref<Editor | undefined>
  let content: Ref<string | undefined>

  beforeEach(() => {
    editor = ref(undefined)
    content = ref(undefined)
  })

  it('should not set content if editor is undefined', () => {
    const setContent = vi.fn()
    editor.value = undefined
    content.value = 'test'

    useRefContent(editor, content)

    expect(setContent).not.toHaveBeenCalled()
  })

  it('should not set content if content is undefined', () => {
    const setContent = vi.fn()
    editor.value = { commands: { setContent } } as unknown as Editor
    content.value = undefined

    useRefContent(editor, content)

    expect(setContent).not.toHaveBeenCalled()
  })

  it('should set content if editor and content are defined', async () => {
    const setContent = vi.fn()
    editor.value = { commands: { setContent } } as unknown as Editor

    useRefContent(editor, content)

    content.value = 'test'

    await vi.waitFor(() => expect(setContent).toHaveBeenCalled())

    expect(setContent).toHaveBeenCalledWith('test')
  })
})