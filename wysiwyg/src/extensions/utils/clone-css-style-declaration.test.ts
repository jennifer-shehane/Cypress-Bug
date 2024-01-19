import { cloneCSSStyleDeclaration } from './clone-css-style-declaration'

describe('cloneCSSStyleDeclaration', () => {
  it('should clone the CSSStyleDeclaration object', () => {
    const style = document.createElement('div').style
    style.color = 'red'
    style.fontSize = '16px'

    const clonedStyle = cloneCSSStyleDeclaration(style)

    expect(clonedStyle.color).toBe(style.color)
    expect(clonedStyle.fontSize).toBe(style.fontSize)
  })

  it('should not modify the original CSSStyleDeclaration object', () => {
    const style = document.createElement('div').style
    style.color = 'red'
    style.fontSize = '16px'

    const clonedStyle = cloneCSSStyleDeclaration(style)

    clonedStyle.color = 'blue'
    clonedStyle.fontSize = '20px'

    expect(style.color).toBe('red')
    expect(style.fontSize).toBe('16px')
  })
})
