import { Role } from '@/app/schemas/authSchema'
import { z } from 'zod'

export const baseSchema = z.object({
  id: z
    .number()
    .positive(),

  active: z.boolean().optional(),
  createdAt: z.string().optional()
})

export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(32, 'O nome não pode ter mais de 32 caracteres.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('O email deve ser válido.')
    .max(63, 'O email não pode ter mais de 63 caracteres.')
    .optional(),
  role: z.nativeEnum(Role).optional()
})

export const userInputSchema = userBaseSchema.extend({
  id: z.number().optional(),
  active: z.boolean().optional(),
  createdAt: z.string().optional(),
  password: z
    .string()
    .trim()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .max(32, 'A senha não pode ter mais de 32 caracteres.'),
  role: z.nativeEnum(Role).optional()
})

export const userResponseSchema = userBaseSchema.extend({
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional()
})

export type UserInput = z.infer<typeof userInputSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type Users = UserResponse[] | Partial<UserResponse>[]
