import { z } from 'zod'
import { GenderEnum } from './enums/gender'
import { MaritalStatusEnum } from './enums/maritalStatus'

const formatCPF = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '')
  return digitsOnly
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    .slice(0, 14)
}

export const personSchema = z.object({
  fullName: z
    .string()
    .max(255, 'O nome completo não pode ter mais de 255 caracteres.')
    .nonempty('O nome completo é obrigatório.'),
  taxId: z
    .string()
    .min(11, 'O CPF deve conter pelo menos 11 dígitos numéricos.')
    .max(14, 'O CPF deve conter no máximo 14 caracteres.')
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      'O CPF deve estar no formato XXX.XXX.XXX-XX.',
    )
    .transform((value) => formatCPF(value)),
  nationalId: z
    .string()
    .max(20, 'O RG não pode ter mais de 20 caracteres.')
    .nonempty('O RG é obrigatório.'),
  dateOfBirth: z
    .string()
    .refine(
      (date) => /^\d{2}[-\/]\d{2}[-\/]\d{4}$/.test(date),
      'A data de nascimento deve estar no formato dd-mm-aaaa ou dd/mm/aaaa.',
    )
    .transform((date) => {
      return new Date(date.replace(/-/g, '/'))
    }),
  issuingBody: z
    .string()
    .max(120, 'O órgão emissor não pode ter mais de 120 caracteres.')
    .nonempty('O órgão emissor é obrigatório.'),
  gender: z.nativeEnum(GenderEnum),
  maritalStatus: z.nativeEnum(MaritalStatusEnum),
})
