import api from "./api";

const endpoint = "/address";

export const AddressService = {
  /**
   * 🔥 Cria um novo endereço para um funcionário
   * @param {object} addressData - Dados do endereço
   * @returns {Promise<any>} - Resposta da API
   */
  async createAddress(addressData: any): Promise<any> {
    try {
      const response = await api.post(endpoint, addressData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar endereço:", error);
      throw error;
    }
  },

  /**
   * 🔍 Busca um endereço pelo ID
   * @param {number} id - ID do endereço
   * @returns {Promise<any>} - Dados do endereço
   */
  async getAddressById(id: number): Promise<any> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(" Erro ao buscar endereço:", error);
      throw error;
    }
  },

  /**

   * @returns {Promise<any[]>} - Lista de endereços
   */
  async getAllAddresses(): Promise<any[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(" Erro ao buscar todos os endereços:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza um endereço existente
   * @param {number} id - ID do endereço
   * @param {object} addressData - Novos dados do endereço
   * @returns {Promise<any>} - Dados atualizados
   */
  async updateAddress(id: number, addressData: any): Promise<any> {
    try {
      const response = await api.put(`${endpoint}/${id}`, addressData);
      return response.data;
    } catch (error) {
      console.error(" Erro ao atualizar endereço:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui um endereço pelo ID
   * @param {number} id - ID do endereço a ser removido
   * @returns {Promise<any>} - Confirmação da exclusão
   */
  async deleteAddress(id: number): Promise<any> {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar endereço:", error);
      throw error;
    }
  },
};
