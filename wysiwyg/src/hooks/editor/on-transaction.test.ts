import { type Editor } from '@tiptap/vue-3'
import type { Mock } from 'vitest'
import { type Ref } from 'vue'
import { useOnTransaction } from './on-transaction'

describe('useOnTransaction', () => {
  let editor: Ref<Editor>
  let onEditorTransactionHandler: Mock
  let transactionHandlers = new Set<() => void>()

  function runHandlers (): void {
    transactionHandlers.forEach(handler => handler())
    vi.runAllTimers()
  }

  beforeAll(() => {
    vi.mock('vue')
    vi.useFakeTimers()
  })

  beforeEach(async () => {
    transactionHandlers.clear()
    const vue = await import('vue');
    (vue as any).onMounted = vi.fn().mockImplementation((handler: () => void) => {
      handler()
    })
    editor = {
      value: {
        on: vi.fn().mockImplementation((event: string, handler: () => void) => {
          transactionHandlers.add(handler)
        }),
        off: vi.fn().mockImplementation((event: string, handler: () => void) => {
          transactionHandlers.delete(handler)
        })
      }
    } as any
    onEditorTransactionHandler = vi.fn()
  })

  it('should call the onEditorTransactionHandler immediately and on every transaction', () => {
    useOnTransaction(editor, onEditorTransactionHandler)

    expect(onEditorTransactionHandler).toHaveBeenCalledTimes(0)

    runHandlers()
    vi.runAllTimers()

    expect(onEditorTransactionHandler).toHaveBeenCalledTimes(1)
  })

  it('should call the onEditorTransactionHandler immediately and on every transaction with the editor as argument', () => {
    useOnTransaction(editor, onEditorTransactionHandler)

    expect(transactionHandlers.size).toBe(1)
    runHandlers()
    vi.runAllTimers()

    expect(onEditorTransactionHandler).toHaveBeenCalled()
  })
})