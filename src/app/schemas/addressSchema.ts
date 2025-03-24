import { z } from 'zod'

export const addressSchema = z.object({
  street: z
    .string()
    .max(255, 'O nome da rua não pode ter mais de 255 caracteres')
    .nonempty('O nome da rua é obrigatório'),
  number: z
    .string()
    .max(8, 'O número não pode ter mais de 8 caracteres')
    .nonempty('O número é obrigatório'),
  neighborhood: z
    .string()
    .max(120, 'O bairro não pode ter mais de 120 caracteres')
    .nonempty('O bairro é obrigatório'),
  city: z
    .string()
    .max(255, 'O nome da cidade não pode ter mais de 255 caracteres')
    .nonempty('O nome da cidade é obrigatório'),
  zipCode: z
    .string()
    .max(9, 'O CEP deve estar no formato XXXXX-XXX')
    .regex(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato XXXXX-XXX')
    .nonempty('O CEP é obrigatório'),
  state: z
    .string()
    .max(60, 'O nome do estado não pode ter mais de 60 caracteres')
    .nonempty('O nome do estado é obrigatório')
})
