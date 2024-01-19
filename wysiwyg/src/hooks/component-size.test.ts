import {
  ref, type Ref 
} from 'vue'
import { useComponentElementRef } from './component-element-ref'
import { useComponentSize } from './component-size'
import { useElementSize } from './element-size'

vi.mock('./element-size')
vi.mock('./component-element-ref')

describe('useComponentSize', () => {
  let mockComponentInstanceRef: Ref<{ $el: HTMLElement | null }>

  beforeEach(() => {
    const divElement = document.createElement('div')
    mockComponentInstanceRef = ref({ $el: divElement })
  })

  it('should call useComponentElementRef with the correct argument', () => {
    useComponentSize(mockComponentInstanceRef)
    expect(useComponentElementRef).toHaveBeenCalledWith(mockComponentInstanceRef)
  })

  it('should return the result of useElementSize', () => {
    const mockElementSize = {
      width: ref(100),
      height: ref(100) 
    }
    vi.mocked(useElementSize).mockReturnValue(mockElementSize)
    const result = useComponentSize(mockComponentInstanceRef)
    expect(result).toBe(mockElementSize)
  })
})