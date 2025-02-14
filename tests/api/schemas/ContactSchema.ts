import { z } from "zod";

export const ContactSchema = z.object({
  phone_number: z
    .string(),
  email: z
    .string(),
  website: z
    .string(),
})

export type Contact = z.infer<typeof ContactSchema>
