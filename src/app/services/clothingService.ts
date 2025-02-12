import api from "./api"; // 🔥 Importa a instância do Axios configurada

const endpoint = "/clothing"; // 🔥 Define o endpoint base

export const ClothingService = {
  /**
   * 🔥 Cria um novo vestuário para um funcionário
   * @param {object} clothingData - Dados do vestuário
   * @returns {Promise<any>} - Resposta da API
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
   * @returns {Promise<any>} - Dados do vestuário
   */
  async getClothingById(id: number): Promise<any> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar vestuário:", error);
      throw error;
    }
  },

  /**
   * 📋 Retorna todos os vestuários cadastrados
   * @returns {Promise<any[]>} - Lista de vestuários
   */
  async getAllClothing(): Promise<any[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todos os vestuários:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza um vestuário existente
   * @param {number} id - ID do vestuário
   * @param {object} clothingData - Novos dados do vestuário
   * @returns {Promise<any>} - Dados atualizados
   */
  async updateClothing(id: number, clothingData){
    try {
      const response = await api.put(`${endpoint}/${id}`, clothingData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar vestuário:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui um vestuário pelo ID
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
