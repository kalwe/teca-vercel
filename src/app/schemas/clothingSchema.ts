import { z } from "zod";

export const clothingSchema = z.object({
  shirt_size: z
    .string()
    .max(80, "The shirt size must not exceed 80 characters")
    .nonempty("The shirt size is required"),
  pants_size: z
    .string()
    .max(80, "The pants size must not exceed 80 characters")
    .nonempty("The pants size is required"),
  shoe_size: z
    .string()
    .max(80, "The shoe size must not exceed 80 characters")
    .nonempty("The shoe size is required"),
});
