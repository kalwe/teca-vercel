import { Address } from './address'
import { BankAccount } from './bank'
import { Clothing } from './clothing'
import { Contact } from './contact'
import { Position } from './position'

type EmployeeT = {
  id?: any | null
  active?: any | null
  name?: any | null
  fullName?: any | null
  dateOfBirth?: any | null
  taxId?: any | null
  nationalId: any | null
  issuingBody?: any | null
  registration: any | null
  supervisor?: any | null
  manager?: any | null
  salary?: any | null
  contractDate?: Date | null
  removalDate?: Date | null
  positionId?: any | null
  position?: Position | null
  address?: Address | null
  contact?: Contact | null
  bank?: BankAccount | null
  clothing?: Clothing | null
  gender?: any | null
  maritalStatus?: any | null
}

export type Employee = EmployeeT | Partial<EmployeeT>
export type Employees = EmployeeT[] | Partial<EmployeeT>[]

export interface ContractFormProps {
  data?: Employee | null
  // isEditable?: boolean
}

export interface CpfMaskProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export interface BirthDayMaskProps {
  value: string
  onChange: (value: string) => void
}

export interface CepMaskProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export interface PhoneMaskProps {
  value: string
  onChange: (value: string) => void
}

export interface QuantityMaskProps {
  value: number
  onChange: (newQuantity: number) => void
  min?: number
  max?: number
}

export interface RgMaskProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export interface MoneyInputProps {
  value: any | null
  onChange: (newValue: string) => void
}
