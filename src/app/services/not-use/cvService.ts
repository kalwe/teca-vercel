import api from "./api";
import { Cv } from "../types/cv";

const endpoint = "/cv";

export const CvService = {
  /**
   * 📄 Cria um novo currículo
   * @param {Cv} cvData - Dados do currículo
   * @returns {Promise<Cv>} - Resposta da API
   */
  async createCv(cvData: Cv): Promise<Cv> {
    try {
      const response = await api.post(endpoint, cvData);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao criar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar currículo");
    }
  },

  /**
   * 🔍 Busca um currículo pelo ID
   * @param {number} id - ID do currículo
   * @returns {Promise<Cv>} - Dados do currículo
   */
  async getCvById(id: number): Promise<Cv> {
    if (!id) throw new Error("ID inválido fornecido para buscar currículo.");
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar currículo");
    }
  },

  /**
   * 📜 Obtém todos os currículos
   * @returns {Promise<Cv[]>} - Lista de currículos
   */
  async getAllCvs(): Promise<Cv[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar todos os currículos:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar currículos");
    }
  },

  /**
   * 🔄 Atualiza um currículo existente
   * @param {number} id - ID do currículo
   * @param {Partial<Cv>} cvData - Novos dados do currículo (parciais)
   * @returns {Promise<Cv>} - Dados atualizados
   */
  async updateCv(id: number, cvData: Partial<Cv>): Promise<Cv> {
    if (!id) throw new Error("ID inválido fornecido para atualizar currículo.");
    try {
      const response = await api.patch(`${endpoint}/${id}`, cvData); // ⚡ Usando PATCH para atualizar apenas os campos alterados
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao atualizar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar currículo");
    }
  },

  /**
   * 🗑️ Exclui um currículo pelo ID
   * @param {number} id - ID do currículo a ser removido
   * @returns {Promise<{ message: string }>} - Confirmação da exclusão
   */
  async deleteCv(id: number): Promise<{ message: string }> {
    if (!id) throw new Error("ID inválido fornecido para deletar currículo.");
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao deletar currículo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao deletar currículo");
    }
  },
};
