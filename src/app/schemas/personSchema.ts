
import { z } from "zod"
import { GenderEnum } from "./enums/gender"
import { MaritalStatusEnum } from "./enums/maritalStatus"

// Enums para gênero e estado civil
// export enum GenderType {
//   male = 'Masculino',
//   female = 'Feminino',
//   other = 'Outro',
//   not_given = 'Não informado',
// }

// export enum maritalStatusType {
//   SINGLE = 'Solteiro',
//   MARRIED = 'Casado',
//   DIVORCED = 'Divorciado',
//   LIVING_TOGETHER = "Amasiado/Concubinado",
//   STABLE_UNION = "União Estável",
//   WIDOWER = "Viúvo"
// }

export const personSchema = z.object({
  full_name: z
    .string()
    .max(255, "O nome completo não pode ter mais de 255 caracteres.")
    .nonempty("O nome completo é obrigatório."),
  tax_id: z
    .string()
    .length(14, "O CPF deve conter exatamente 14 caracteres.") // <- Correto, CPF tem 14 caracteres
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "O CPF deve estar no formato XXX.XXX.XXX-XX.") // Corrigindo regex
    .nonempty("O CPF é obrigatório."),
  national_id: z
    .string()
    .max(20, "O RG não pode ter mais de 20 caracteres.")
    .nonempty("O RG é obrigatório."),
  date_of_birth: z
    .string()
    .refine(
      (date) => /^\d{2}-\d{2}-\d{4}$/.test(date),
      "A data de nascimento deve estar no formato dd-mm-aaaa."
    )
    .transform((date) => new Date(date)),
  issuing_body: z
    .string()
    .max(120, "O órgão emissor não pode ter mais de 120 caracteres.")
    .nonempty("O órgão emissor é obrigatório."),
  gender: z.nativeEnum(GenderEnum),
  marital_status: z.nativeEnum(MaritalStatusEnum),
})
