import { mergeAttributes } from '@tiptap/vue-3'
import {
  readColWidthAttributeValueFromHTMLElement,
  renderColHTMLFromOptions,
  parseHTML
} from './table-cell-width'

vi.mock('@tiptap/vue-3')

describe('readColWidthAttributeValueFromHTMLElement', () => {
  it('should return an array with a single number equals to the sum of when colwidth attribute numeric values', () => {
    const element = document.createElement('div')
    element.setAttribute('colwidth', '10,20.5,30.5')
    const result = readColWidthAttributeValueFromHTMLElement(element)
    expect(result).toEqual([61])
  })

  it('should return null when colwidth attribute is not present', () => {
    const element = document.createElement('div')
    const result = readColWidthAttributeValueFromHTMLElement(element)
    expect(result).toBeNull()
  })

  it('should return null when colwidth attribute is empty', () => {
    const element = document.createElement('div')
    element.setAttribute('colwidth', '')
    const result = readColWidthAttributeValueFromHTMLElement(element)
    expect(result).toBeNull()
  })
})

describe('renderColHTMLFromOptions', () => {
  it('should return the HTML setting for a table cell column with the specified width', () => {
    const options = {
      HTMLAttributes: {
        colwidth: [
          10,
          20,
          30
        ] 
      }
    }
    const mergedAttributesStyle = 'width: 10px'

    const expectedAttrs = {
      colwidth: [
        10,
        20,
        30
      ],
      style: `${mergedAttributesStyle};width: 60px`
    }
    const mergeAttributesMock = vi.mocked(mergeAttributes).mockReturnValue({
      ...expectedAttrs,
      style: mergedAttributesStyle
    })
    const result = renderColHTMLFromOptions.call({ options } as any, options as any)
    expect(result).toEqual([
      'td',
      expectedAttrs,
      0
    ])
    expect(mergeAttributesMock).toHaveBeenCalledWith(options.HTMLAttributes, options.HTMLAttributes)
  })

  it('should render the HTML for a table cell column with no width when colwidth attribute is not present', () => {
    const options = {
      HTMLAttributes: { // this value doesn't matter because "mergeAttributes" return value is used as the result
        style: 'width: 200px',
        colwidth: [
          1,
          2,
          3
        ]
      }
    }
    const expectedAttrs = {
      colwidth: null,
      style: 'width: 20px'
    }
    const mergeAttributesMock = vi.mocked(mergeAttributes).mockReturnValue({ ...expectedAttrs })
    const result = renderColHTMLFromOptions.call({ options } as any, options as any)
    expect(result).toEqual([
      'td',
      expectedAttrs,
      0
    ])
    expect(mergeAttributesMock).toHaveBeenCalledWith(options.HTMLAttributes, options.HTMLAttributes)
  })

  it('should render the HTML for a table cell column with no width when colwidth attribute is empty', () => {
    const options = { HTMLAttributes: { colwidth: [] } }
    const expectedAttrs = {
      colwidth: [''],
      style: ''
    }
    const mergeAttributesMock = vi.mocked(mergeAttributes).mockReturnValue(expectedAttrs)
    const result = renderColHTMLFromOptions.call({ options } as any, options as any)
    expect(result).toEqual([
      'td',
      expectedAttrs,
      0
    ])
    expect(mergeAttributesMock).toHaveBeenCalledWith(options.HTMLAttributes, options.HTMLAttributes)
  })
})

describe('parseHTML', () => {
  it('should return the cssText of the given HTMLElement', () => {
    const element = document.createElement('div')
    element.style.cssText = 'color: red; font-size: 16px;'
    const result = parseHTML(element)
    expect(result).toBe('color: red; font-size: 16px;')
  })

  it('should return an empty string if the given HTMLElement has no cssText', () => {
    const element = document.createElement('div')
    const result = parseHTML(element)
    expect(result).toBe('')
  })
})