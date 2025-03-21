import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/position'

export const PositionService = {
  async getAllPositions() {
    try {
      const response = await api.get(endpoint)

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((position) => ({
          id: position.id ?? 0,
          name: position.name ?? 'Desconhecido'
        }))
      }

      console.warn('Resposta inesperada da API, retornando array vazio.')
      return []
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro Axios ao pegar cargos:', error.message)
      } else {
        console.error('Erro desconhecido ao pegar cargos:', error)
      }

      return []
    }
  }
}
