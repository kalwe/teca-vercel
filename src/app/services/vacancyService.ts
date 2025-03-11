import api from './api'

const endpoint = '/vacancy'

export const VacancyService = {
  async createVacancy(vacancyData: any) {
    const response = await api.post(endpoint, vacancyData)
    return response.status === 201 ? response.data : null
  },

  async getVacancyById(id: any) {
    const response = await api.get(`${endpoint}/${id}`)
    return response.status === 200 ? response.data : null
  },

  async getAllVacancies() {
    const response = await api.get(endpoint)
    return response.status === 200 ? response.data : null
  },

  async updateVacancy(id: any, vacancyData: any) {
    const response = await api.put(`${endpoint}/${id}`, vacancyData)
    return response.status === 200 ? response.data : null
  },

  async deleteVacancy(id: any) {
    const response = await api.delete(`${endpoint}/${id}`)
    return response.status === 204
  }
}
