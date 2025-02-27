import { z } from 'zod'

import { addressSchema } from './addressSchema'
import { bankAccountSchema } from './bankAccountSchema'
import { clothingSchema } from './clothingSchema'
import { contactSchema } from './contactSchema'
import { personSchema } from './personSchema'
import { positionSchema } from './positionSchema'

export const employeeSchema = personSchema.extend({
  name: z
    .string()
    .max(80, 'O nome do funcionário não pode ter mais de 80 caracteres.')
    .nonempty('O nome do funcionário é obrigatório.'),
  registration: z
    .string()
    .max(4, 'O número de matrícula não pode ter mais de 4 caracteres.')
    .nonempty('O número de matrícula é obrigatório.'),
  supervisor: z.boolean().optional(),
  manager: z.boolean().optional(),
  salary: z
    .number()
    .int('O salário deve ser um número inteiro.')
    .positive('O salário deve ser um valor positivo.'),
  contractDate: z
    .string()
    .nonempty('A data de contratação é obrigatória.')
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'A data de contratação deve estar no formato DD-MM-AAAA.',
    ),
  removalDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'A data de contratação deve estar no formato DD-MM-AAAA.',
    ),
  positionId: z.number().optional(),
  position: positionSchema.optional(),
  address: addressSchema.optional(),
  contact: contactSchema.optional(),
  bank: bankAccountSchema.optional(),
  clothing: clothingSchema.optional(),
})
