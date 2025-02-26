import { z } from 'zod';
import { Role } from '../types/authType';

export const baseSchema = z.object({
  id: z
    .number()
    .positive()
    .refine((val) => {
      val > 0;
    }),
  active: z.boolean(),
  createdAt: z.string(),
});

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
  password: z
    .string()
    .trim()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .max(32, 'A senha não pode ter mais de 32 caracteres.'),
  role: z.nativeEnum(Role),
});

export const userInputSchema = userBaseSchema.extend({
  id: z.number().optional(),
  active: z.boolean().optional(),
  createdAt: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});

export const userResponseSchema = userBaseSchema.extend({
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export const userDeletedSchema = baseSchema.extend({
  deletedAt: z.string(),
});

const omitPassword = userResponseSchema.omit({ password: true });
export type UserInput = z.infer<typeof userInputSchema>;
export type UserResponse = z.infer<typeof omitPassword>;
