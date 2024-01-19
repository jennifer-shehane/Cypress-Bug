import { ViewportSize } from '../../enums'
import type { ProvideViewportSizeValue } from './types'

export const DITokenViewportSize = 'DIRootSize' as const

export const provideRootSizeValueDefault: ProvideViewportSizeValue = Object.freeze({
  [ViewportSize.XS]: false,
  [ViewportSize.SM]: false,
  [ViewportSize.MD]: false,
  [ViewportSize.LG]: false,
  [ViewportSize.XL]: false,
  viewportSize: ViewportSize.SM
})