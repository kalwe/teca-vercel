import { z } from "zod";

// ✅ Schema para validação e sanitização do banco de horas
export const hoursBankSchema = z.object({
  id: z.number().int().positive("O ID deve ser um número inteiro positivo"),

  employee_id: z.number().int().positive("O ID do funcionário deve ser um número inteiro positivo"),

  hours_worked: z
    .number()
    .nonnegative("As horas trabalhadas não podem ser negativas")
    .max(24, "As horas trabalhadas não podem ultrapassar 24 por dia"),

  hours_overtime: z
    .number()
    .nonnegative("As horas extras não podem ser negativas")
    .optional()
    .default(0),

  hours_balance: z
    .number()
    .min(-24, "O saldo de horas não pode ser menor que -24")
    .max(24, "O saldo de horas não pode ultrapassar 24 por dia"),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),

  created_at: z
    .string()
    .nullable()
    .optional()
    .refine((val) => val === null || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(val!), {
      message: "Formato de timestamp inválido (ISO 8601)",
    }),

  updated_at: z
    .string()
    .nullable()
    .optional()
    .refine((val) => val === null || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(val!), {
      message: "Formato de timestamp inválido (ISO 8601)",
    }),
});
