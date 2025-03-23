export type baseType = {
  id: number
  created_at: Date
  updated_at: Date
  is_active: boolean
  deleted_at: Date
  version: number
}

export interface SwitchTabsComponentsProps {
  data: any
  onNext: () => void
  onPrev: () => void
  employeeId: number
}
