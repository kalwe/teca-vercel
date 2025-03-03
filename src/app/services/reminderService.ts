import { AxiosError } from 'axios'
import { ReminderInput } from '../schemas/reminderSchema'
import api from './api'

const endpoint = '/reminder'

export const ReminderService = {
  async createReminder(reminderData: ReminderInput) {
    try {
      const response = await api.post(endpoint, reminderData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error('Erro ao criar lembrete:', error)
    }
  },

  async getAllReminders() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error('Erro ao buscar todos os lembretes:', error)
    }
  },
}
