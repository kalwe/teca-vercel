import { GenderEnum } from '../schemas/enums/gender'
import { MaritalStatusEnum } from '../schemas/enums/maritalStatus'

export type PersonType = {
  name: string
  fullName?: string | null
  taxId: string
  nationalId: string
  dateOfBirth?: string
  issuingBody?: string
  gender: GenderEnum
  maritalStatus: MaritalStatusEnum
}

export type Person = PersonType
export type Persons = Person[]

export type PersonProps = {
  data: Person
  onChange: (data: Person) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
}
