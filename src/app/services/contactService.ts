import api from "./api"; // Importa a instância do Axios configurada

const endpoint = '/contact'

export const ContactService = {

  async createContact(contactData: any) {
    try {
      const response = await api.post(endpoint, contactData)
      if (response.status == 201){
      return response.data
      }
    } catch (error) {
      console.error("Erro ao criar contato:", error)

    }
  },
  async getContactById(id: any){
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
      ;
    }
  },

  async getAllContacts() {
    try {
      const response = await api.get(`/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os contatos:", error);
      ;
    }
  },

  updateContact: async (id: any, contactData: any) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, contactData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
      ;
    }
  },

  deleteContact: async (id: any) => {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
      ;
    }
  },
};
