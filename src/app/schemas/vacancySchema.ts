import { z } from "zod";
import {axios} from "axios"

//  Esquema de validação para Vaga
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

//  Definição do Contexto de Vagas
export interface VacancyContextProps {
  vacancies: Vacancy[];
  set_vacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  add_vacancy: (vacancy: Vacancy) => Promise<void>;
  update_vacancy: (id: number, updates: Partial<Vacancy>) => Promise<void>;
  remove_vacancy: (id: number) => Promise<void>;
}

export const VacancyService = {
  /**
   * Cria uma nova vaga com validação
   * @param {Vacancy} vacancyData - Dados da vaga
   * @returns {Promise<Vacancy>} - Resposta da API validada
   */
  async createVacancy(vacancyData: Vacancy): Promise<Vacancy> {
    try {
      const validatedData = sanitizeVacancy(vacancyData);
      const response = await axios.post(API_URL, validatedData, {
        validateStatus: status => status === 201,
      });

      return vacancySchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao criar vaga:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar vaga.");
    }
  },

  /**
   * Busca uma vaga pelo ID
   * @param {number} id - ID da vaga
   * @returns {Promise<Vacancy>} - Dados da vaga validados
   */
  async getVacancyById(id: number): Promise<Vacancy> {
    if (!id) throw new Error("ID inválido fornecido para buscar vaga.");
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        validateStatus: status => status === 200,
      });

      return vacancySchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao buscar vaga:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar vaga.");
    }
  },

  /**
   * Obtém todas as vagas
   * @returns {Promise<Vacancy[]>} - Lista de vagas validadas
   */
  async getAllVacancies(): Promise<Vacancy[]> {
    try {
      const response = await axios.get(API_URL, {
        validateStatus: status => status === 200,
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todas as vagas:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar vagas.");
    }
  },

  /**
   * Atualiza uma vaga existente com validação
   * @param {number} id - ID da vaga
   * @param {Partial<Vacancy>} vacancyData - Novos dados da vaga
   * @returns {Promise<Vacancy>} - Dados atualizados validados
   */
  async updateVacancy(id: number, vacancyData: Partial<Vacancy>): Promise<Vacancy> {
    if (!id) throw new Error("ID inválido fornecido para atualizar vaga.");
    try {
      const validatedData = sanitizeVacancy(vacancyData);
      const response = await axios.put(`${API_URL}/${id}`, validatedData, {
        validateStatus: status => status === 200,
      });

      return vacancySchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar vaga.");
    }
  },

  /**
   * Exclui uma vaga pelo ID
   * @param {number} id - ID da vaga a ser removida
   * @returns {Promise<void>} - Confirmação da exclusão
   */
  async deleteVacancy(id: number): Promise<void> {
    if (!id) throw new Error("ID inválido fornecido para deletar vaga.");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        validateStatus: status => status === 204,
      });

      // Retornamos void porque `204 No Content` não tem corpo de resposta
    } catch (error) {
      console.error("Erro ao deletar vaga:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao deletar vaga.");
    }
  },
};
