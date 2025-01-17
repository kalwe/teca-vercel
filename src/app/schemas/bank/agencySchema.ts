import { z } from "zod";

// Validação para número de agência bancária
export const agencySchema = z
  .string()
  .regex(
    /^\d{4,6}(-\d{1})?$/,
    "Número de agência inválido. Use de 4 a 6 dígitos, com ou sem dígito verificador no formato XXXXX-D"
  );
