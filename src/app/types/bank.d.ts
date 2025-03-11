export enum AccountTypeEnum {
  SALARIO = 'Salário',
  CORRENTE = 'Corrente',
  CONJUNTA = 'Conjunta',
  POUPANCA = 'Poupança',
  UNIVERSITARIA = 'Universitária',
  EMPRESARIAL = 'Empresarial'
}

// type accountType = keyof typeof AccountTypeEnum

type BankAccountT = {
  bank?: any | null
  agency?: any | null
  account?: any | null
  type?: any | null
  employeeId?: any | null
}

export type ModeType = 'edit' | 'add' | 'view' | 'create'

export type BankAccount = BankAccountT | Partial<BankAccountT>
export type BankAccounts = BankAccountT[] | Partial<BankAccountT>[]

export type BankProps = {
  data: BankAccount
  onChange: (updatedData: BankAccount) => void
  onNext: () => void
  onPrev: () => void
  mode: ModeType
  employeeId?: any | null
}
