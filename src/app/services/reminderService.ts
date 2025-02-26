import { AxiosError } from "axios";
import { ReminderInput } from "../schemas/reminderSchema";
import api from "./api";

const endpoint = '/reminder';

export const ReminderService = {
   /**
   *  Cria um novo lembrete com validação
   * @param {ReminderInput} _reminderData - Dados do lembrete
   */
   async createReminder(_reminderData: ReminderInput) {
    try {


      const response = await api.post(endpoint, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao criar lembrete:", AxiosError);
      throw new Error("Erro ao criar lembrete");
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
      console.error("Erro ao buscar todos os lembretes:", AxiosError);
      throw new Error("Erro ao buscar lembretes");
    }
  },

};
