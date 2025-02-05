import { z } from "zod";

// Importação de schemas relacionados
import { addressSchema } from "./addressSchema";
import { contactSchema } from "./contactSchema";
import { bankAccountSchema } from "./bankAccountSchema";
import { clothingSchema } from "./clothingSchema";

export const employeeSchema = z.object({
    name: z
      .string()
      .max(80, "O nome do funcionário não pode ter mais de 80 caracteres.")
      .nonempty("O nome do funcionário é obrigatório."),
    registration: z
      .string()
      .max(4, "O número de matrícula não pode ter mais de 4 caracteres.")
      .nonempty("O número de matrícula é obrigatório."),
    supervisor: z.boolean().optional(),
    manager: z.boolean().optional(),
    salary: z
      .number()
      .int("O salário deve ser um número inteiro.")
      .positive("O salário deve ser um valor positivo."),
    contract_date: z
      .string()
      .nonempty("A data de contratação é obrigatória.")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "A data de contratação deve estar no formato DD-MM-AAAA."
      ),
    removal_date: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "A data de contratação deve estar no formato DD-MM-AAAA."
      ),
    function: z
      .number()
   ,
    address: z.array(addressSchema).optional(),
    contact: z.array(contactSchema).optional(),
    bank: z.array(bankAccountSchema).optional(),
    clothing: z.array(clothingSchema).optional(),
  });
