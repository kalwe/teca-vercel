'use client';

import { z } from 'zod';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export const userAuthInputSchema = z.object({
  name: z
    .string()
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(80, 'O nome não pode ter mais de 80 caracteres.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export const userAuthResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  token: z.string(),
  authenticated: z.boolean().refine((auth) => auth == true),
  expire: z.string(),
});

export type UserAuthInput = z.infer<typeof userAuthInputSchema>;
export type UserAuthResponse = z.infer<typeof userAuthResponseSchema>;
