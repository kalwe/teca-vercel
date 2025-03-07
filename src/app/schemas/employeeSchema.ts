import { z } from 'zod'

import { addressSchema } from './addressSchema'
import { bankAccountSchema } from './bankAccountSchema'
import { clothingSchema } from './clothingSchema'
import { contactSchema } from './contactSchema'
import { personSchema } from './personSchema'
import { positionSchema } from './positionSchema'

export const employeeSchema = personSchema.extend({
  registration: z
    .string()
    .max(4, 'O número de matrícula não pode ter mais de 4 caracteres.')
    .nonempty('O número de matrícula é obrigatório.'),
  supervisor: z.boolean().optional(),
  manager: z.boolean().optional(),
  salary: z
    .number()
    .int('O salário deve ser um número inteiro.')
    .positive('O salário deve ser um valor positivo.')
    .optional(),
  contractDate: z
    .string()
    .regex(
      /^\d{2}-\d{2}-\d{4}$/,
      'A data de contratação deve estar no formato DD-MM-AAAA.'
    )
    .optional(),
  removalDate: z
    .string()
    .regex(
      /^\d{2}-\d{2}-\d{4}$/,
      'A data de contratação deve estar no formato DD-MM-AAAA.'
    )
    .optional(),
  positionId: z.number(),
  position: positionSchema.optional(),
  address: addressSchema.optional(),
  contact: contactSchema.optional(),
  bank: bankAccountSchema.optional(),
  clothing: clothingSchema.optional()
})
