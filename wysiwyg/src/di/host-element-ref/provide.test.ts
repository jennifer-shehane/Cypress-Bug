import {
  ref, provide 
} from 'vue'
import { DITokenHostElement } from './const'
import { provideHostElementRef } from './provide'

vi.mock('vue')

describe('provideHostElementRef', () => {
  it('should call Vue "ref" with the default value', () => {
    const hostElementRefMock = ref(undefined)

    const provideMocked = vi.mocked(provide)

    provideHostElementRef(hostElementRefMock)

    expect(provideMocked).toHaveBeenCalledWith(DITokenHostElement, hostElementRefMock)
  })
})