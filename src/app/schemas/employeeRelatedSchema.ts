import { z } from "zod";

// Schema de validação para o relacionamento com Employee
export const employeeRelatedSchema = z.object({
  employee: z
   .number()
});
