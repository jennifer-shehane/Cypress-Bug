import {
  ref, inject
} from 'vue'
import {
  DITokenViewportSize, provideRootSizeValueDefault 
} from './const'
import { injectViewportSize } from './inject'

vi.mock('vue')

describe('injectViewportSize', () => {
  it('should call Vue "ref" with the default value', () => {
    const mockedRef = vi.mocked(ref)
    injectViewportSize()
    expect(mockedRef).toHaveBeenCalledWith(provideRootSizeValueDefault)
  })
  it('should call Vue "inject" with the DITokenViewportSize and the reference as the default value', () => {
    const refReturn = ref(provideRootSizeValueDefault)
    vi.mocked(ref).mockReturnValueOnce(refReturn)
    const mockedInject = vi.mocked(inject).mockReturnValueOnce(refReturn)
    expect(injectViewportSize()).toBe(refReturn)
    expect(mockedInject).toHaveBeenCalledWith(DITokenViewportSize, refReturn)
  })
})
