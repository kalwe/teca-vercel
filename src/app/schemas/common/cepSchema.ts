import { z } from "zod";

// Validação para CEP brasileiro
export const cepSchema = z
  .string()
  .regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido. Use XXXXX-XXX ou XXXXXXXX")
  .refine((cep) => {
    const numeros = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
    return numeros.length === 8; // Garante que há exatamente 8 dígitos
  }, {
    message: "O CEP deve conter exatamente 8 dígitos numéricos",
  });
