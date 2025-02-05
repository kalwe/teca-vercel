import { z } from "zod";

// Validação para matrícula com números inteiros de até 4 dígitos
export const matriculaSchema = z
  .string()
  .regex(/^\d{1,4}$/, "A matrícula deve conter apenas números inteiros com no máximo 4 dígitos");

