import api from "./api";
import { Cv } from "../types/cv";
import { cvSchema } from "../schemas/cvSchema";
import {axios} from 'axios'

const endpoint = "/cv";

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
