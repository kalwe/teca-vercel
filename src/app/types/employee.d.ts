import { Address } from './address'
import { BankAccount } from './BankAccount'
import { Clothing } from './clothing'
import { Contact } from './contact'
import { Position } from './position'

export type EmployeeType = {
  id?: number
  active?: boolean
  name: string
  fullName?: string
  dateOfBirth: string
  taxId: string
  nationalId: string
  issuingBody: string
  registration: string
  supervisor?: boolean
  manager?: boolean
  salary: number
  contractDate: Date
  removalDate?: Date
  positionId?: number
  position?: Position
  address?: Address
  contact?: Contact
  bank?: BankAccount
  clothing?: Clothing
  gender: string
  maritalStatus: string

}

export type Employee = EmployeeType
export type Employees = EmployeeType[]

export interface EmployeeProps {
  data: EmployeeType
  onChange: (updatedData: EmployeeType) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
}
export interface ContractFormProps {
  mode: 'edit' | 'create'
  employeeData?: EmployeeType | null
  onSave: (updatedData: EmployeeType) => Promise<void>
  onCancel: () => void
  isEditable: boolean
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
  value: string
  onChange: (newValue: string) => void
}
