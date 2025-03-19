import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/position'

export const PositionService = {
  async getAllPositions() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao buscar todos os cargos:', error)
    }
  }
}
