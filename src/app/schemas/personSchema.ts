import { z } from 'zod'
import { GenderEnum } from './enums/gender'
import { MaritalStatusEnum } from './enums/maritalStatus'

export const personSchema = z.object({
  name: z
    .string()
    .max(80, 'O nome do funcionário não pode ter mais de 80 caracteres.')
    .nonempty('O nome do funcionário é obrigatório.'),
  fullName: z.string().optional(),
  taxId: z
    .string()
    .min(11, 'O CPF deve conter pelo menos 11 dígitos numéricos.')
    .max(14, 'O CPF deve conter no máximo 14 caracteres.')
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      'O CPF deve estar no formato XXX.XXX.XXX-XX.'
    ),
  nationalId: z.string().max(20).nonempty('O RG é obrigatório.'),
  dateOfBirth: z.string().optional(),
  issuingBody: z.string().max(120).optional(),
  gender: z.nativeEnum(GenderEnum).optional(),
  maritalStatus: z.nativeEnum(MaritalStatusEnum).optional()
})
