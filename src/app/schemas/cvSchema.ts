"use client";

import { z } from "zod";
import axios from "axios";

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
export const cvSchema = z.object({
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

export interface CvFormProps {
  mode: "edit" | "create";
  curriculoData?: Cv;
  onSave: (updatedData: Cv) => Promise<void>; // Callback para salvar
  onCancel: () => void; // Callback para cancelar
  loading: boolean; // Indica estado de carregamento
}


// Tipos inferidos do schema
export type Cv = z.infer<typeof cvSchema>;

// URL da API
const API_URL = "/api/v1/cv"; // Ajuste conforme necessário

// Serviço do CV
export const CvService = {
  /**
   * Cria um novo currículo
   * @param {Cv} cvData - Dados do currículo
   * @returns {Promise<Cv>} - Resposta da API
   */
  async createCv(cvData: Cv): Promise<Cv> {
    try {
      // Validação do schema
      cvSchema.parse(cvData);

      // Requisição para a API
      const response = await axios.post(API_URL, cvData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar currículo");
    }
  },

  /**
   * Busca um currículo pelo ID
   * @param {number} id - ID do currículo
   * @returns {Promise<Cv>} - Dados do currículo
   */
  async getCvById(id: number): Promise<Cv> {
    if (!id) throw new Error("ID inválido fornecido para buscar currículo.");
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar currículo");
    }
  },

  /**
   * Obtém todos os currículos
   * @returns {Promise<Cv[]>} - Lista de currículos
   */
  async getAllCvs(page: number): Promise<Cv[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar todos os currículos:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar currículos");
    }
  },

  /**
   * Atualiza um currículo existente
   * @param {number} id - ID do currículo
   * @param {Partial<Cv>} cvData - Novos dados do currículo (parciais)
   * @returns {Promise<Cv>} - Dados atualizados
   */
  async updateCv(id: number, cvData: Partial<Cv>): Promise<Cv> {
    if (!id) throw new Error("ID inválido fornecido para atualizar currículo.");
    try {
      // Validação do schema
      cvSchema.parse(cvData);

      const response = await axios.patch(`${API_URL}/${id}`, cvData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar currículo");
    }
  },

  /**
   * Exclui um currículo pelo ID
   * @param {number} id - ID do currículo a ser removido
   * @returns {Promise<{ message: string }>} - Confirmação da exclusão
   */
  async deleteCv(id: number): Promise<{ message: string }> {
    if (!id) throw new Error("ID inválido fornecido para deletar currículo.");
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao deletar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao deletar currículo");
    }
  },
};
