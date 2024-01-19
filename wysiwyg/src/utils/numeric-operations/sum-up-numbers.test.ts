import { sumUpNumbers } from './sum-up-numbers'

describe('sumUpNumbers', () => {
  it('should return the sum of numbers', () => {
    const numbers = [
      1,
      '2',
      3,
      '4',
      5
    ]
    const result = sumUpNumbers(numbers)
    expect(result).toBe(15)
  })
  
  it('should return 0 when numbers array is empty', () => {
    const numbers: number[] = []
    const result = sumUpNumbers(numbers)
    expect(result).toBe(0)
  })
  
  it('should return the number itself when numbers array contains only one number', () => {
    const num = 10.155
    const numbers = [num]
    const result = sumUpNumbers(numbers)
    expect(result).toBe(num)
  })
  
  it('should return the sum if numbers are stringified', () => {
    const numbers = [
      1.5,
      '2',
      3,
      '4',
      5.5
    ] as unknown as number[]
    const result = sumUpNumbers(numbers)
    expect(result).toBe(16)
  })
  
  it('should return NaN when numbers array contains non-numeric values', () => {
    const numbers = [
      1,
      'a',
      3,
      'b',
      5
    ] as unknown as number[]
    const result = sumUpNumbers(numbers)
    expect(result).toBeNaN()
  })
})