import { z } from "zod";

export const bankAccountSchema = z.object({
  bank: z
    .string()
    .max(120, "O nome do banco não deve exceder 120 caracteres.")
    .nonempty("O nome do banco é obrigatório."),
  agency: z
    .string()
    .max(120, "O número da agência não deve exceder 120 caracteres.")
    .nonempty("O número da agência é obrigatório."),
  account: z
    .string()
    .max(120, "O número da conta não deve exceder 120 caracteres.")
    .nonempty("O número da conta é obrigatório."),
  account_type: z
    .string()
    .max(120, "O tipo de conta não deve exceder 120 caracteres.")
    .nonempty("O tipo de conta é obrigatório."),
});
