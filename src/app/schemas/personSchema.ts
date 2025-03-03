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
  name: z.string().nonempty('O nome é obrigatório.'),
  fullName: z.string().nonempty('O sobrenome é obrigatório.'),
  taxId: z
    .string()
    .min(11, 'O CPF deve conter pelo menos 11 dígitos numéricos.')
    .max(14, 'O CPF deve conter no máximo 14 caracteres.')
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      'O CPF deve estar no formato XXX.XXX.XXX-XX.',
    ),
  nationalId: z.string().max(20).nonempty('O RG é obrigatório.'),
  dateOfBirth: z.string().optional(),
  issuingBody: z.string().max(120).nonempty('O órgão emissor é obrigatório.'),
  gender: z.nativeEnum(GenderEnum),
  maritalStatus: z.nativeEnum(MaritalStatusEnum),
});
