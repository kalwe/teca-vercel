import { ClothingType } from "../types/clothing"
import api from "./api"

const endpoint = "/clothing";

export const ClothingService = {
  /**
   *
   * @param {object} clothingData
   *
   */
  async createClothing(ClothingData: ClothingType) {
    try {
      const response = await api.post(endpoint, ClothingData)
      if (response.status == 201)
        return response.data

      // TODO: validar se for erro

      // const createdMock = createClothingMock(ClothingData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao cadastrar vestuário:", error)
      throw error
    }
  },

  /**
   * 🔍 Busca um vestuário pelo ID
   * @param {number} id - ID do vestuário
   *
   */
  async getClothingById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(" Erro ao buscar vestuário:", error);
      throw error;
    }
  },

  async getAllClothing() {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os vestuários:", error);
      throw error;
    }
  },

  /**
   *
   * @param {number} id - ID do vestuário
   * @param {object} clothingData - Novos dados do vestuário
   *
   */
  async updateClothing(id: number, clothingData: any){
    try {
      const response = await api.put(`${endpoint}/${id}`, clothingData);
      return response.data;
    } catch (error) {
      console.error(" Erro ao atualizar vestuário:", error);
      throw error;
    }
  },

  /**
   *
   * @param {number} id - ID do vestuário a ser removido
   * @returns //{Promise<any>} - Confirmação da exclusão
   */
  async deleteClothing(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(" Erro ao deletar vestuário:", error);
      throw error;
    }
  },
};
