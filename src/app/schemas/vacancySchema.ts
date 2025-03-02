import { z } from 'zod'

export const vacancySchema = z.object({
  id: z.number().optional(),
  quantity: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  position: z
    .string()
    .min(3, 'O cargo deve ter no mínimo 3 caracteres')
    .max(255, 'O cargo deve ter no máximo 255 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'O cargo deve conter apenas letras e números'),
  description: z
    .string()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'A descrição deve conter apenas letras e números')
    .optional()
    .default(''),
  requirements: z
    .string()
    .min(3, 'Os requisitos devem ter no mínimo 3 caracteres')
    .max(500, 'Os requisitos devem ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'Os requisitos devem conter apenas letras e números')
    .optional()
    .default(''),
  benefits: z
    .string()
    .min(3, 'Os benefícios devem ter no mínimo 3 caracteres')
    .max(500, 'Os benefícios devem ter no máximo 500 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, 'Os benefícios devem conter apenas letras e números')
    .optional()
    .default(''),
  salary: z.number().positive('O salário deve ser um valor positivo.'),
})

export type Vacancy = z.infer<typeof vacancySchema>
