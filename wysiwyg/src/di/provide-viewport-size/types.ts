import { type ViewportSize } from '../../enums'

export interface ProvideViewportSizeValue extends Record<ViewportSize, boolean> {
  viewportSize: ViewportSize
}