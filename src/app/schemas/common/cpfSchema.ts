import { z } from "zod";

// Validação apenas do formato e da quantidade de dígitos
export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido") // Valida o formato
  .refine((cpf) => {
    const numeros = cpf.replace(/\D/g, ""); // Remove pontos e traços
    return numeros.length === 11; // Verifica se tem exatamente 11 dígitos
  }, {
    message: "CPF deve conter exatamente 11 dígitos numéricos",
  });
