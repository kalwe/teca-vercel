import { z } from "zod";

// Schema de validação para Permission
export const permissionSchema = z.object({
  name: z
    .string()
    .max(120, "O nome da permissão não pode ter mais de 120 caracteres.")
    .nonempty("O nome da permissão é obrigatório."),
  description: z
    .string()
    .nonempty("A descrição da permissão é obrigatória."),
});
