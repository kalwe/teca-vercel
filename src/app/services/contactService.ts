import api from "./api"; // Importa a instância do Axios configurada

export const ContactService = {
  /**
   * Cria um novo contato para um funcionário
   * @param {object} contactData - Dados do contato
   * @returns {Promise} - Resposta da API
   */
  async createContact(ContactData: ContactType) {
    try {
      const response = await api.post(endpoint, ContactData)
      if (response.status == 201)
        return response.data

      // TODO: validar se for erro

      // const createdMock = createContactMock(ContactData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },
  /**
   * Busca um contato por ID
   * @param {number} id - ID do contato
   * @returns {Promise} - Dados do contato
   */
  getContactById: async (id: number) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
      throw error;
    }
  },

  /**
   * Busca todos os contatos cadastrados
   * @returns {Promise} - Lista de contatos
   */
  getAllContacts: async () => {
    try {
      const response = await api.get("/contact");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os contatos:", error);
      throw error;
    }
  },

  /**
   * Atualiza um contato existente
   * @param {number} id - ID do contato
   * @param {object} contactData - Novos dados do contato
   * @returns {Promise} - Dados atualizados
   */
  updateContact: async (id: number, contactData: any) => {
    try {
      const response = await api.put(`/contact/${id}`, contactData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
      throw error;
    }
  },

  /**
   * Exclui um contato pelo ID
   * @param {number} id - ID do contato a ser removido
   * @returns {Promise} - Confirmação da exclusão
   */
  deleteContact: async (id: number) => {
    try {
      const response = await api.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
      throw error;
    }
  },
};
