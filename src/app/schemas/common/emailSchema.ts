import { z } from "zod";

// Validação para endereço de e-mail
export const emailSchema = z
  .string()
  .email("Endereço de e-mail inválido"); // Valida o formato do e-mail
