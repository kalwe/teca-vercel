import { GenderEnum } from '../schemas/enums/gender'
import { MaritalStatusEnum } from '../schemas/enums/maritalStatus'

export type PersonType = {
  fullName: string
  taxId: string
  nationalId: string
  dateOfBirth: Date | null
  issuingBody: string
  gender: GenderEnum
  maritalStatus: MaritalStatusEnum
}

export type PersonProps = {
  data: PersonType
  onChange: (data: PersonType) => void
  isEditable: boolean
  onNext: () => void
  onPrev: () => void
}
