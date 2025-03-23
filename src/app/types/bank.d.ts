export enum AccountTypeEnum {
  SALARIO = 'Salário',
  CORRENTE = 'Corrente',
  CONJUNTA = 'Conjunta',
  POUPANCA = 'Poupança',
  UNIVERSITARIA = 'Universitária',
  EMPRESARIAL = 'Empresarial'
}

type BankAccountT = {
  bank?: any | null
  agency?: any | null
  account?: any | null
  type?: any | null
  employeeId: number | null
}

export type BankAccount = BankAccountT | Partial<BankAccountT>
export type BankAccounts = BankAccountT[] | Partial<BankAccountT>[]
