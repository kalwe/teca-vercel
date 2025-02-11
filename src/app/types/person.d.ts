import { GenderEnum } from "../schemas/enums/gender"
import { MaritalStatusEnum } from "../schemas/enums/maritalStatus"

export type PersonType = {
  full_name: string
  tax_id: string
  national_id: string
  date_of_birth: Date | null
  issuing_body: string
  gender: GenderEnum
  marital_status: MaritalStatusEnum
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
//   full_name: "",
//   tax_id: "",
//   national_id: "",
//   date_of_birth: null,
//   issuing_body: "",
//   gender: "Masculino", // Ajuste para um valor válido de GenderType
//   marital_status: "Solteiro", // Ajuste para um valor válido de MaritalStatusType
// }
