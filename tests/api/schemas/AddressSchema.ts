import { z } from "zod";

export const AddressSchema = z.object({
  street: z
    .string(),
  number: z
    .string(),
  neighborhood: z
    .string(),
  city: z
    .string(),
  zip_code: z
    .string(),
  state: z
    .string(),
  employee: z.number()
})

export type Address = z.infer<typeof AddressSchema>
