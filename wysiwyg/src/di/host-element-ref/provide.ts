import {
  provide, type Ref 
} from 'vue'
import { DITokenHostElement } from './const'

export function provideHostElementRef (hostElementRef: Ref<HTMLElement | undefined>): void {
  provide(DITokenHostElement, hostElementRef)
}