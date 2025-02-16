import { z } from "zod";

import { userOutputSchema, userInputSchema } from "./schemas";


//  Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0),
});

//  Email validation mixin
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("O email deve ser válido.")
    .max(255, "O email não pode ter mais de 255 caracteres."),
});



// Schema base para reutilização em criação e edição
export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .max(80, "O nome não pode ter mais de 80 caracteres."),
  roles: z.array(z.string().trim().toLowerCase()).optional(),
});

// Schema para criação de usuário (senha obrigatória)
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    id: z.number().min(1, "ID deve ser maior que 0").optional(),
    password: z
      .string()
      .trim()
      .min(6, "A senha deve ter pelo menos 6 caracteres.")
      .optional(), // Permite ser opcional na edição
  })
  .strict();

//  Schema para retorno de usuário (sem senha)
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true),
  });

//  Schema para usuários excluídos (Soft Delete)
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(),
});

//  Tipagem correta para o formulário
export type UserData = z.infer<typeof userInputSchema>;

export type UserFormProps = {
  mode: "create" | "edit";
  userData?: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  isEditable: boolean;
  loading: boolean; // ✅ Ensure the component supports a loading state
  onSave: (data: UserData) => Promise<void>;
  onCancel: () => void;
};
