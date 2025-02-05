import { z } from "zod";

// 🔹 Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0), // 🔥 Garante que `id` seja um número válido ou 0
});

// 🔹 Email validation mixin (sanitizado)
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("O email deve ser válido.")
    .max(255, "O email não pode ter mais de 255 caracteres."),
});

// 🔹 User Base Schema (sem email e senha)
export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .max(80, "O nome não pode ter mais de 80 caracteres."),
  roles: z
    .array(z.string().trim().toLowerCase()) // 🔥 Garante que os papéis sejam strings limpas
    .optional(),
});

// 🔹 Schema para criação de usuário (inclui email e senha) 🚀
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    password: z.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres."),
    id: z.number().int().positive().optional(), // ✅ Agora `id` é opcional
  })
  .strict();


// 🔹 Schema para retorno de usuário (sem senha) 🚀
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true), // ✅ Define um valor padrão para evitar erro
  });

// 🔹 Schema para usuários excluídos (Soft Delete) 🚀
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(), // 🔥 Permite `null`
});
