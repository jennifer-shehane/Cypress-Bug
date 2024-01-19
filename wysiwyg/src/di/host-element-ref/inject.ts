import {
  inject, ref
} from 'vue'
import {
  provideHostElementRefDefault, DITokenHostElement 
} from './const'
import type { ProvideHostElementRefValue } from './types'

export function injectHostElementRef (): ProvideHostElementRefValue {
  const provideHostElementRefDefaultRef = ref(provideHostElementRefDefault)
  return inject(DITokenHostElement, provideHostElementRefDefaultRef)
}
