"use client";

import { z } from "zod";

// Expressoes regulares para validação
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const cepRegex = /^\d{5}-\d{3}$/;
const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

// Tipos de escolaridade
export enum ScholarityType {
  PRIMARY = 'Ensino Fundamental',
  SECONDARY = 'Ensino Médio',
  TERTIARY = 'Ensino Superior',
}

// Schema de CV
export const resumeSchema = z.object({
  id: z
    .number()
    .int()
    .positive("O ID deve ser um número inteiro positivo"), // Identificador único

  full_name: z
    .string()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres")
    .max(100, "O nome completo deve ter no máximo 100 caracteres")
    .trim(),

  email: z
    .string()
    .trim()
    .regex(emailRegex, "Formato de e-mail inválido") // Usa regex para maior precisão
    .refine((email) => email.includes("@"), {
      message: "O e-mail deve conter '@'",
    }),

  tax_id: z
    .string()
    .regex(cpfRegex, "Formato de CPF inválido (XXX.XXX.XXX-XX)")
    .trim(),

  phone: z
    .string()
    .regex(phoneRegex, "Formato de telefone inválido ((XX) XXXXX-XXXX)")
    .trim(),

  zip_code: z
    .string()
    .regex(cepRegex, "Formato de CEP inválido (XXXXX-XXX)")
    .trim(),

  position: z
    .string()
    .min(2, "O cargo deve ter pelo menos 2 caracteres")
    .max(50, "O cargo deve ter no máximo 50 caracteres")
    .trim(),

  region: z
    .string()
    .min(2, "A região deve ter pelo menos 2 caracteres")
    .max(50, "A região deve ter no máximo 50 caracteres")
    .trim(),

  scholarity: z
    .nativeEnum(ScholarityType),

  date_of_birth: z
    .string()
    .regex(dateRegex, "Formato de data inválido (dd-mm-aaaa)")
    .trim(),

  pdf_url: z
    .string()
    .trim()
    .regex(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, "Formato de URL inválido")
    .refine((url) => url.endsWith(".pdf"), {
      message: "O link deve ser um arquivo PDF",
    }),
});

export interface ResumeFormProps {
  mode: "edit" | "create";
  curriculoData?: Resume;
  onSave: (updatedData: Resume) => Promise<void>; // Callback para salvar
  onCancel: () => void; // Callback para cancelar
  loading: boolean; // Indica estado de carregamento
}


// Tipos inferidos do schema
export type Resume = z.infer<typeof resumeSchema>;
