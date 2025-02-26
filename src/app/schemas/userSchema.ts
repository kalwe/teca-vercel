import { Role } from '@/app/types/authType';
import { z } from 'zod';

export const baseSchema = z.object({
  id: z.number().int().positive().optional(),
});

//  Email validation mixin
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('O email deve ser válido.')
    .max(255, 'O email não pode ter mais de 255 caracteres.')
    .optional(),
});

export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(80, 'O nome não pode ter mais de 80 caracteres.'),
  roles: z.nativeEnum(Role).optional(),
});

export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    // id: z.number().min(1, 'ID deve ser maior que 0').optional(),
    password: z
      .string()
      .trim()
      .min(6, 'A senha deve ter pelo menos 6 caracteres.')
      .optional(),
  })
  .strict();

export const userOutputSchema = userBaseSchema.merge(emailMixinSchema).extend({
  active: z.boolean().default(true),
});

export const userDeletedSchema = baseSchema.extend({
  deletedAt: z.string().optional(),
});

export type UserInput = z.infer<typeof userInputSchema>;
