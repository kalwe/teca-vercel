import api from "./api";

const endpoint = '/reminder';

export const ReminderService = {
   /**
   *  Cria um novo lembrete com validação
   * @param {ReminderInput} reminderData - Dados do lembrete
   */
   async createReminder(reminderData: ReminderInput) {
    try {
      // 🔥 Removendo o campo `id` para evitar problemas no Prisma
      const { id, ...dataToSubmit } = reminderData;

      // 🔥 Enviando o JSON da forma correta
      const response = await api.post(endpoint, dataToSubmit, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar lembrete");
    }
  },

  async getAllReminders() {
    try {
      const response = await api.get(endpoint, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todos os lembretes:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar lembretes");
    }
  },

};
