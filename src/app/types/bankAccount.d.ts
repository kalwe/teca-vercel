export type BankAccountType = {
  bank: string
  agency: string
  account: string
  account_type: string
  employee?: number
}

export type ModeType = "edit" | "add" | "view" | "create"

export type BankProps = {
  data: BankAccountType
  onChange: (updatedData: BankProps["data"]) => void
  onNext: () => void
  onPrev: () => void
  mode: ModeType
  employee?: number
}
