import api from "../api";
import { Vacancy } from "../../types/vacancyType";

const endpoint = "/vacancy";

export const VacancyService = {
  /**
   * 🔥 Cria uma nova vaga
   * @param {Vacancy} vacancyData - Dados da vaga
   * @returns {Promise<Vacancy>} - Resposta da API
   */
  async createVacancy(vacancyData: Vacancy): Promise<Vacancy> {
    try {
      const response = await api.post(endpoint, vacancyData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar vaga:", error);
      throw error;
    }
  },

  /**
   * 🔍 Busca uma vaga pelo ID
   * @param {number} id - ID da vaga
   * @returns {Promise<Vacancy>} - Dados da vaga
   */
  async getVacancyById(id: number): Promise<Vacancy> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar vaga:", error);
      throw error;
    }
  },

  /**
   * 📜 Obtém todas as vagas
   * @returns {Promise<Vacancy[]>} - Lista de vagas
   */
  async getAllVacancies(): Promise<Vacancy[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todas as vagas:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza uma vaga existente
   * @param {number} id - ID da vaga
   * @param {Vacancy} vacancyData - Novos dados da vaga
   * @returns {Promise<Vacancy>} - Dados atualizados
   */
  async updateVacancy(id: number, vacancyData: Vacancy): Promise<Vacancy> {
    try {
      const response = await api.put(`${endpoint}/${id}`, vacancyData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar vaga:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui uma vaga pelo ID
   * @param {number} id - ID da vaga a ser removida
   * @returns {Promise<any>} - Confirmação da exclusão
   */
  async deleteVacancy(id: number): Promise<any> {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar vaga:", error);
      throw error;
    }
  },
};
