import type { Editor } from '@tiptap/vue-3'
import { checkIfActive } from './check-if-active'

describe('checkIfActive', () => {
  it('should return true when the option is active', () => {
    // Define a mock option
    const option = { checkIfActive: vi.fn().mockReturnValue(true) }
    // Define a mock editor
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const editor = {} as Editor
    // Call the function with the mock option and editor
    const result = checkIfActive(option, editor)
    // Assert that the option's checkIfActive method was called with the editor
    expect(option.checkIfActive).toHaveBeenCalledWith(editor)
    // Assert that the function returned true
    expect(result).toBe(true)
  })

  it('should return false when the option is not active', () => {
    // Define a mock option
    const option = { checkIfActive: vi.fn().mockReturnValue(false) }
    // Define a mock editor
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const editor = {} as Editor
    // Call the function with the mock option and editor
    const result = checkIfActive(option, editor)
    // Assert that the option's checkIfActive method was called with the editor
    expect(option.checkIfActive).toHaveBeenCalledWith(editor)
    // Assert that the function returned false
    expect(result).toBe(false)
  })
})