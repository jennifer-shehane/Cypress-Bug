import type { Editor } from '@tiptap/vue-3'
import type { SpyInstance } from 'vitest'
import {
  ref, type Ref 
} from 'vue'
import { useFilterActive } from './filter-active'
import * as onTransactionModule from './on-transaction'

interface TestOption {
  checkIfActive: (editor: Editor) => boolean
}

vi.mock('./on-transaction')

describe('useFilterActive', () => {
  let editor: Ref<Editor>
  let listWithCheckIfActive: Ref<TestOption[]>
  let refActive: ReturnType<typeof useFilterActive>
  let useOnTransaction: SpyInstance

  beforeAll(() => {
    useOnTransaction = vi.spyOn(onTransactionModule, 'useOnTransaction')
  })

  beforeEach(() => {
    editor = ref({} as unknown as Editor) as Ref<Editor>
    listWithCheckIfActive = ref([])

    refActive = useFilterActive(editor, listWithCheckIfActive)
  })

  it('returns a ref', () => {
    expect(refActive).toBeDefined()
  })

  it('returns a ref with an empty array as initial value', () => {
    expect(refActive.value).toEqual([])
  })

  it('updates the ref when the editor transaction is updated', () => {
    const option1 = { checkIfActive: vi.fn(() => true) }
    const option2 = { checkIfActive: vi.fn(() => false) }
    listWithCheckIfActive.value = [
      option1,
      option2
    ]

    expect(useOnTransaction).toHaveBeenCalledTimes(1)
    expect(useOnTransaction).toHaveBeenCalledWith(editor, expect.any(Function))
    useOnTransaction.mock.calls[0][1]()

    expect(refActive.value).toEqual([option1])
    expect(option1.checkIfActive).toHaveBeenCalledWith(editor.value)
    expect(option2.checkIfActive).toHaveBeenCalledWith(editor.value)
  })

  it('does not update the ref when the editor transaction is not updated', () => {
    const option1 = { checkIfActive: vi.fn(() => true) }
    const option2 = { checkIfActive: vi.fn(() => false) }
    listWithCheckIfActive.value = [
      option1,
      option2
    ]

    expect(useOnTransaction).toHaveBeenCalledTimes(1)
    expect(useOnTransaction).toHaveBeenCalledWith(editor, expect.any(Function))
    useOnTransaction.mock.calls[0][1]()
    useOnTransaction.mock.calls[0][1]()

    expect(refActive.value).toEqual([option1])
    expect(option1.checkIfActive).toHaveBeenCalledTimes(2)
    expect(option2.checkIfActive).toHaveBeenCalledTimes(2)
  })
})