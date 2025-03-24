import { z } from 'zod'
import { positionSchema } from './positionSchema'

export const vacancySchema = z.object({
  id: z.number().optional(),
  quantity: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  positionId: z.number().optional(),
  position: positionSchema.optional(),
  description: z
    .string()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'A descrição deve conter apenas letras e números')
    .optional(),
  requirements: z
    .string()
    .min(3, 'Os requisitos devem ter no mínimo 3 caracteres')
    .max(500, 'Os requisitos devem ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'Os requisitos devem conter apenas letras e números')
    .optional(),
  benefits: z
    .string()
    .min(3, 'Os benefícios devem ter no mínimo 3 caracteres')
    .max(500, 'Os benefícios devem ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'Os benefícios devem conter apenas letras e números')
    .optional(),
  salary: z.string().optional()
})
