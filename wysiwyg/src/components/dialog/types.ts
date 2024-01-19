export type Target = '_blank' | '_self' | '_parent' | '_top'

export interface ChangeUrlPayload {
  url: string
  target: Target
}