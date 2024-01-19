/**
 * This function sums up the numbers in an array of numbers.
 * 
 * @param numbers - an array of numbers, which may be stringified.
 * @returns - the sum of the numbers in the array.
 */
export const sumUpNumbers = (numbers: Array<string | number>): number => (
  numbers.reduce((accumulator: number, currentValue: number | string): number => accumulator + Number(currentValue), 0)
)