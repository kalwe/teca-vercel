"use client";

import { z } from "zod"

// Expressoes regulares para validação

export const resumeSchema = z.object({
  id: z
    .number()
    .int()
    .positive("O ID deve ser um número inteiro positivo"), // Identificador único

  fullName: z
    .string()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres")
    .max(100, "O nome completo deve ter no máximo 100 caracteres")
    .trim(),

  pdf_url: z
    .string()
    .trim()
    .regex(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, "Formato de URL inválido")
    .refine((url) => url.endsWith(".pdf"), {
      message: "O link deve ser um arquivo PDF",
    }),

  registration_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data inválida. Use um formato de data válido (dd-mm-yyyy ou ISO8601).",
    }),
  positionId: z
    .number(),
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
