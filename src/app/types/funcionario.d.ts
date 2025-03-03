
export type FuncionarioType = {
registration: number
contractDate: string
removalDate: string
positionId: number
}

export type FuncionarioProps = {
  data: FuncionarioType
  onChange: (data: FuncionarioType) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
}
