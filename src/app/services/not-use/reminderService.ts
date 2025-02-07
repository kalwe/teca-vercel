import api from "./api";

const endpoint = "/reminder";

export const ReminderService = {
  /**
   * 🔥 Cria um novo lembrete
   * @param {object} reminderData - Dados do lembrete
   * @returns {Promise<any>} - Resposta da API
   */
  async createReminder(reminderData: any): Promise<any> {
    try {
      const response = await api.post(endpoint, reminderData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar lembrete:", error);
      throw error;
    }
  },

  /**
   * 🔍 Busca um lembrete pelo ID
   * @param {number} id - ID do lembrete
   * @returns {Promise<any>} - Dados do lembrete
   */
  async getReminderById(id: number): Promise<any> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar lembrete:", error);
      throw error;
    }
  },

  /**
   * 📜 Obtém todos os lembretes
   * @returns {Promise<any[]>} - Lista de lembretes
   */
  async getAllReminders(): Promise<any[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todos os lembretes:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza um lembrete existente
   * @param {number} id - ID do lembrete
   * @param {object} reminderData - Novos dados do lembrete
   * @returns {Promise<any>} - Dados atualizados
   */
  async updateReminder(id: number, reminderData: any): Promise<any> {
    try {
      const response = await api.put(`${endpoint}/${id}`, reminderData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar lembrete:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui um lembrete pelo ID
   * @param {number} id - ID do lembrete a ser removido
   * @returns {Promise<any>} - Confirmação da exclusão
   */
  async deleteReminder(id: number): Promise<any> {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar lembrete:", error);
      throw error;
    }
  },
};
