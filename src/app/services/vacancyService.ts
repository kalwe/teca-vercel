import api from './api'

const endpoint = '/vacancy'

export const VacancyService = {
  async createVacancy(vacancyData: any) {
    try {
      const response = await api.post(endpoint, vacancyData)
      if (response.status === 201) {
        return response.data
      }
    } catch (error) {

    }
  },

  async getVacancyById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {

    }
  },

  async getAllVacancies() {
    try {
      const response = await api.get(endpoint)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {

    }
    return null
  },

  async updateVacancy(id: any, vacancyData: any) {
    try {
      console.log(vacancyData)
      const response = await api.put(`${endpoint}/${id}`, vacancyData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {

    }
  },

  async deleteVacancy(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status === 204) {
        return true
      }
    } catch (error) {

    }
    return false
  },


}
