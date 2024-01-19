import { TEST_UNIQUE_NAME_PREFIX } from '../conf'
import {
  nameDOMElement, type ElementType 
} from './name-element'

describe('nameDOMElement', () => {
  it('should return the correct name for a button control element', () => {
    const name = 'myButton'
    const expected = `${TEST_UNIQUE_NAME_PREFIX}_btn_${name}`
    const result = nameDOMElement(name)
    expect(result).toBe(expected)
  })

  it('should return the correct name for a custom control element', () => {
    const name = 'myCustomControl'
    const ctrl = 'custom'
    const expected = `${TEST_UNIQUE_NAME_PREFIX}_${ctrl}_${name}`
    const result = nameDOMElement(name, ctrl as unknown as ElementType)
    expect(result).toBe(expected)
  })
})