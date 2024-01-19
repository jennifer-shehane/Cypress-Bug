export interface CommandBtnProps {
  name: string
  icon: string
  isActive: boolean
  isDisabled?: boolean
  useBtnActiveStrategy?: boolean
  tooltip?: string
  commandHandler: () => void
}
