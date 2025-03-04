import { AxiosError } from 'axios'
import { Vacancy } from '../types/vacancyType'
import api from './api'

const endpoint = '/vacancy'

export const VacancyService = {
  async createVacancy(vacancyData: Vacancy) {
    try {
      const response = await api.post(endpoint, vacancyData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao criar vaga: ', error.response?.data)
      }
      console.error('Erro ao criar vaga: ', error)
    }
  },

  async getVacancyById(id: number) {
    try {
      const response = await api.get(`/vacancy/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao criar vaga: ', error.response?.data)
      }
      console.error('Erro ao criar vaga: ', error)
    }
  },

  async getAllVacancies() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error('Erro ao criar vaga: ', error)
    }
  },

  async updateVacancy(id: number, vacancyData: Vacancy) {
    try {
      const response = await api.put(`${endpoint}/${id}`, vacancyData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao atualizar vaga:', error.response?.data)
      }
    }
  },

  async deleteVacancy(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data)
      }
      console.error(error)
    }
  },
}
