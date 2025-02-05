import { z } from "zod";

export const contactSchema = z.object({
  phone_number: z
    .string()
    .max(120, "O número de telefone não pode ter mais de 120 caracteres.")
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "O número de telefone deve estar no formato internacional válido (ex: +5511999999999)."
    )
    .optional(), // Opcional, mas validado se preenchido
  email: z
    .string()
    .max(255, "O email não pode ter mais de 255 caracteres.")
    .email("O email deve ser um endereço de email válido.")
    .optional(), // Opcional, mas validado se preenchido
  website: z
    .string()
    .url("O website deve ser uma URL válida.")
    .optional(), // Opcional, mas validado se preenchido
});
