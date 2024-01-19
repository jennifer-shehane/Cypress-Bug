import { mergeCSSStyleTextDeclarations } from './merge-css-text-declarations'

describe('mergeCSSStyleTextDeclarations', () => {
  it('should merge multiple CSS style text declarations', () => {
    const css1 = 'color: red'
    const css2 = 'font-size: 16px'
    const css3 = 'background-color: blue'

    const mergedCSS = mergeCSSStyleTextDeclarations(css1, css2, css3)

    expect(mergedCSS).toBe(css1 + ';' + css2 + ';' + css3)
  })

  it('should handle empty CSS style text declarations', () => {
    const css1 = ''
    const css2 = 'font-size: 16px'
    const css3 = 'background-color: blue;'

    const mergedCSS = mergeCSSStyleTextDeclarations(css1, css2, css3)

    expect(mergedCSS).toBe(css2 + ';' + css3)
  })

  it('should handle CSS style text declarations with trailing semicolons', () => {
    const css1 = 'color: red; border: 1px solid black;'
    const css2 = 'font-size: 16px'
    const css3 = 'background-color: blue'

    const mergedCSS = mergeCSSStyleTextDeclarations(css1 + ';', css2 + ';', css3 + ';')

    expect(mergedCSS).toBe(css1 + ';' + css2 + ';' + css3 + ';')
  })
})