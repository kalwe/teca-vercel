import { z } from "zod";

export const BankAccountSchema = z.object({
  bank: z.string(),
  agency: z.string(),
  account: z.string(),
  account_type: z.string()
});

export type BankAccount = z.infer<typeof BankAccountSchema>
