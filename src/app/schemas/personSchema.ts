
import { z } from "zod";

// Enums para gênero e estado civil
export const GenderType = z.enum(["Masculino", "Feminino"]);

export const MaritalStatusType = z.enum([
  "Amasiado/Concubinado",
  "Casado",
  "Divorciado",
  "Solteiro",
  "União Estável",
  "Viúvo"
]);

export const personModelSchema = z.object({
  full_name: z
    .string()
    .max(255, "O nome completo não pode ter mais de 255 caracteres.")
    .nonempty("O nome completo é obrigatório."),
  tax_id: z
    .string()
    .length(14, "O CPF deve conter exatamente 14 caracteres.") // <- Correto, CPF tem 14 caracteres
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "O CPF deve estar no formato XXX.XXX.XXX-XX.") // Corrigindo regex
    .nonempty("O CPF é obrigatório."),
  national_id: z
    .string()
    .max(20, "O RG não pode ter mais de 20 caracteres.")
    .nonempty("O RG é obrigatório."),
  date_of_birth: z
    .string()
    .refine(
      (date) => /^\d{4}-\d{2}-\d{2}$/.test(date),
      "A data de nascimento deve estar no formato YYYY-MM-DD."
    )
    .transform((date) => new Date(date)),
  issuing_body: z
    .string()
    .max(120, "O órgão emissor não pode ter mais de 120 caracteres.")
    .nonempty("O órgão emissor é obrigatório."),
  gender: GenderType,
  marital_status: MaritalStatusType,
});
