import { AxiosError } from 'axios'
import { vacancySchema } from '../schemas/vacancySchema'
import { Vacancy } from '../types/vacancyType'
import api from './api'

const endpoint = '/vacancy'

//  Adicione isso no topo do arquivo:

export const VacancyService = {
  async createVacancy(vacancyData: Vacancy) {
    try {
      const response = await api.post(endpoint, vacancyData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error('Erro ao criar vaga: ', error.response?.data)
      }
      console.error('Erro ao criar vaga: ', error.message)
    }
  },

  async getVacancyById(id: number) {
    const response = await api.get(`/vacancy/${id}`)
    const vacancyData = response.data
    if (vacancyData.salary) {
      vacancyData.salary = Number(vacancyData.salary)
    }

    const validatedVacancy = vacancySchema.parse(vacancyData)
    return validatedVacancy
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
    }
  },

  async updateVacancy(id: number, vacancyData: any) {
    try {
      const validatedData = {
        ...vacancyData,
        salary: Number(vacancyData.salary), // Forçando number aqui
      }

      //  Convertendo para Form Data para burlar o JSON.stringify
      const formData = new URLSearchParams()
      Object.keys(validatedData).forEach((key) => {
        formData.append(key, validatedData[key])
      })

      console.log('Payload final enviado:', formData)

      //  Enviando o payload na marra
      const response = await api.put(`${endpoint}/${id}`, formData)
      if (response.status == 200) {
        response.data
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
