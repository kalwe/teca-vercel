import { z } from "zod";

// Validação para número de conta bancária
export const accountSchema = z.object({
  tipo: z.enum(["conta salário", "conta poupança", "conta corrente"], {
    errorMap: () => ({ message: "Tipo de conta inválido. Escolha entre 'conta salário', 'conta poupança', ou 'conta corrente'" }),
  }),
  numero: z
    .string()
    .regex(
      /^\d{6,12}(-\d{1})?$/,
      "Número de conta inválido. Use de 6 a 12 dígitos, com ou sem dígito verificador no formato XXXXXXX-D"
    ),
});
