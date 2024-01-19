export function mergeCSSStyleTextDeclarations (...cssStringified: string[]): string {
  return cssStringified.reduce((accumulator, currentValue, idx) => {
    const currentValueTrimmed = currentValue.trim()
    if (currentValueTrimmed === '') {
      return accumulator
    }
    const decimeter = idx === 0 || accumulator === '' || accumulator.trim().endsWith(';') ? '' : ';'
    return accumulator + decimeter + currentValue
  }, '')
}
