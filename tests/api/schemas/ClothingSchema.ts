import { z } from "zod";

export const ClothingSchema = z.object({
  shirt_size: z
    .string(),
  pants_size: z
    .string(),
  shoe_size: z
    .string(),
})

export type Clothing = z.infer<typeof ClothingSchema>
