import { z } from "zod";

export const employeeSchema = z.object({

    registration: z
      .string()
      .max(4, "O número de matrícula não pode ter mais de 4 caracteres.")
      .nonempty("O número de matrícula é obrigatório."),
    supervisor: z.boolean().optional(),
    manager: z.boolean().optional(),

    contractDate: z
      .string()
      .nonempty("A data de contratação é obrigatória.")
      .regex(
        /^\d{2}-\d{2}-\d{4}$/,
        "A data de contratação deve estar no formato DD-MM-AAAA."
      ),
    removalDate: z
      .string()
      .regex(
        /^\d{2}-\d{2}-\d{4}$/,
        "A data de contratação deve estar no formato DD-MM-AAAA."
      ),
    positionId: z.string(),

  });
