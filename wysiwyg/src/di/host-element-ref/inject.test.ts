import {
  ref, inject
} from 'vue'
import {
  DITokenHostElement, provideHostElementRefDefault 
} from './const'
import { injectHostElementRef } from './inject'

vi.mock('vue')

describe('injectHostElementRef', () => {
  it('should call Vue "ref" with the default value', () => {
    const mockedRef = vi.mocked(ref)
    injectHostElementRef()
    expect(mockedRef).toHaveBeenCalledWith(provideHostElementRefDefault)
  })
  it('should call Vue "inject" with the DITokenViewportSize and the reference as the default value', () => {
    const refReturn = ref(provideHostElementRefDefault)
    vi.mocked(ref).mockReturnValueOnce(refReturn)
    const mockedInject = vi.mocked(inject).mockReturnValueOnce(refReturn)
    expect(injectHostElementRef()).toBe(refReturn)
    expect(mockedInject).toHaveBeenCalledWith(DITokenHostElement, refReturn)
  })
})
