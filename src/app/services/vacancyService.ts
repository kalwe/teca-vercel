import { AxiosError } from 'axios'
import { Vacancy } from '../types/vacancyType'
import api from './api'

const endpoint = '/vacancy'

export const VacancyService = {
  async createVacancy(vacancyData: Vacancy) {
    try {
      const response = await api.post(endpoint, vacancyData)
      if (response.status === 201) {
        return response.data
      }
    } catch (error) {
      this.handleError(error, 'Erro ao criar vaga')
    }
    return null
  },

  async getVacancyById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      this.handleError(error, 'Erro ao buscar vaga por ID')
    }
    return null
  },

  async getAllVacancies() {
    try {
      const response = await api.get(endpoint)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      this.handleError(error, 'Erro ao buscar todas as vagas')
    }
    return null
  },

  async updateVacancy(id: number, vacancyData: Vacancy) {
    try {
      console.log(id, vacancyData)
      const response = await api.put(`${endpoint}/${id}`, vacancyData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      this.handleError(error, 'Erro ao atualizar vaga')
    }
    return null
  },

  async deleteVacancy(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status === 204) {
        return true
      }
    } catch (error) {
      this.handleError(error, 'Erro ao excluir vaga')
    }
    return false
  },

  handleError(error: unknown, message: string) {
    if (error instanceof AxiosError) {
      console.error(`${message}:`, error.response?.data)
    } else {
      console.error(`${message}:`, error)
    }
  }
}
