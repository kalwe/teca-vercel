import api from "./api"

const endpoint = "/clothing";

export const ClothingService = {
  async createClothing(ClothingData: any) {
    try {
      const response = await api.post(endpoint, ClothingData)
      if (response.status == 201)
        return response.data

    } catch (error) {
      console.error("Erro ao cadastrar vestuário:", error)
      throw error
    }
  },

  async getClothingById(id: any) {
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

  async updateClothing(id: any, clothingData: any){
    try {
      const response = await api.put(`${endpoint}/${id}`, clothingData);
      return response.data;
    } catch (error) {
      console.error(" Erro ao atualizar vestuário:", error);
      throw error;
    }
  },

  async deleteClothing(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(" Erro ao deletar vestuário:", error);
      throw error;
    }
  },
};
