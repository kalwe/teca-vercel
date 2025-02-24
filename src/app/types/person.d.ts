import { GenderEnum } from "../schemas/enums/gender"
import { MaritalStatusEnum } from "../schemas/enums/maritalStatus"

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

// ✅ Define valores padrão para um novo funcionário
// export const initialPersonData: PersonType = {
//   fullName: "",
//   taxId: "",
//   nationalId: "",
//   dateOfBirth: null,
//   issuingBody: "",
//   gender: "Masculino", // Ajuste para um valor válido de GenderType
//   maritalStatus: "Solteiro", // Ajuste para um valor válido de MaritalStatusType
// }
