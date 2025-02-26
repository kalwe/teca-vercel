import { z } from 'zod';

export const baseSchema = z.object({
  id: z.number().int().positive().optional(),
});

export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('O email deve ser válido.')
    .max(255, 'O email não pode ter mais de 255 caracteres.'),
});

export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(80, 'O nome não pode ter mais de 80 caracteres.'),
  roles: z.array(z.string().trim().toLowerCase()).optional(),
});

export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    password: z.string().trim().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  })
  .strict();

// Schema para saída de usuário (`UserOutput`)
export const userResponseSchema = userBaseSchema.merge(emailMixinSchema).extend({
  active: z.boolean().default(true), // Define um valor padrão para evitar erro
});

export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(), // Permite `null`
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserTypeInput = z.infer<typeof userInputSchema>;

export type UserContextType = {
  users: UserResponse[];
  loggedInUser: UserResponse | null;
  addUser: (user: Omit<UserResponse, 'id'> & { password: string }) => Promise<void>;
  updateUser: (id: number, updatedData: Partial<UserResponse>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};
