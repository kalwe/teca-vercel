import { z } from "zod";

// Validação para URL de website
export const websiteSchema = z
  .string()
  .url("URL inválida. Use um endereço válido como https://www.exemplo.com");
