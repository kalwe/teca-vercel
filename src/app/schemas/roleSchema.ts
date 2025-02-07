import { z } from "zod";

// Schema de validação para Function
export const roleSchema = z.object({
  name: z
    .string()
    .max(120, "O nome da função não pode ter mais de 120 caracteres.")
    .nonempty("O nome da função é obrigatório."),
});
