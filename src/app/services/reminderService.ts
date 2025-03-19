import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/reminder'

export const ReminderService = {
  async createReminder(reminderData: any) {
    try {
      const response = await api.post(endpoint, reminderData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
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
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao buscar todos os lembretes:', error)
    }
  },

  async deleteReminders(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao deletar lembrete:', error)
    }
  }
}
