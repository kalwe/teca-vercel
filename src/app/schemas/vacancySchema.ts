import { z } from "zod";


//  Esquema de validação para Vacancy
export const vacancySchema = z.object({
  id: z.number().optional(), // Permite ID opcional para criação
  quantity: z.number().min(1, "A quantidade deve ser pelo menos 1"),
  position: z
    .string()
    .min(3, "O cargo deve ter no mínimo 3 caracteres")
    .max(255, "O cargo deve ter no máximo 255 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, "O cargo deve conter apenas letras e números"),
  description: z
    .string()
    .min(3, "A descrição deve ter no mínimo 3 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, "A descrição deve conter apenas letras e números")
    .optional()
    .default(""),
  requirements: z
    .string()
    .min(3, "Os requisitos devem ter no mínimo 3 caracteres")
    .max(500, "Os requisitos devem ter no máximo 500 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, "Os requisitos devem conter apenas letras e números")
    .optional()
    .default(""),
  benefits: z
    .string()
    .min(3, "Os benefícios devem ter no mínimo 3 caracteres")
    .max(500, "Os benefícios devem ter no máximo 500 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ0-9 ]+$/, "Os benefícios devem conter apenas letras e números")
    .optional()
    .default(""),
  salary: z.number().positive("O salário deve ser um valor positivo."),
});

//  Tipo inferido do esquema de vaga
export type Vacancy = z.infer<typeof vacancySchema>;

//  Função para sanitizar os dados antes do envio
export const sanitizeVacancy = (data): Vacancy => {
  return vacancySchema.parse({
    id: data.id,
    quantity: data.quantity,
    position: data.position.trim(),
    description: data.description ? data.description.trim() : "",
    requirements: data.requirements ? data.requirements.trim() : "",
    benefits: data.benefits ? data.benefits.trim() : "",
    salary: data.salary,
  });
};


//  Definição do Contexto de Vacancy
// TODO: duplicado em vacancyType
export interface VacancyContextProps {
  vacancies: Vacancy[];
  set_vacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>; // TODO: oq isso faz exatamente? "React.Dispatch<React.SetStateAction<Vacancy[]>>"
  add_vacancy: (vacancy: Vacancy) => Promise<void>;
  update_vacancy: (id: number, updates: Partial<Vacancy>) => Promise<void>;
  remove_vacancy: (id: number) => Promise<void>;
  // TODO: add_vacancy, update_vacancy e remove_vacancy nunca sao usados
}
