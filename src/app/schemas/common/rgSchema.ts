import { z } from "zod";

// Validação de formato e quantidade de caracteres do RG
export const rgSchema = z
  .string()
  .regex(/^[0-9.\-]+$/, "RG deve conter apenas números, pontos e hífens")
  .refine((rg) => {
    const numeros = rg.replace(/\D/g, ""); // Remove pontos e hífens
    return numeros.length >= 7 && numeros.length <= 14; // Verifica se o tamanho está entre 7 e 14 dígitos
  }, {
    message: "RG deve conter entre 7 e 14 dígitos numéricos",
  });
