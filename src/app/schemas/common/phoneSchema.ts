import { z } from "zod";

// Validação para números de telefone (formato brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
export const phoneSchema = z
  .string()
  .regex(
    /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/,
    "Telefone inválido. Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX"
  );
