import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/clothing'

export const ClothingService = {
  async createClothing(ClothingData: any) {
    try {
      const response = await api.post(endpoint, ClothingData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao cadastrar vestuário: ', error)
    }
  },

  async getClothingById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao buscar vestuário: ', error)
    }
  },

  async getAllClothing() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao buscar todos os vestuários: ', error)
    }
  },

  async updateClothing(id: any, clothingData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, clothingData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao atualizar vestuário: ', error)
    }
  },

  async deleteClothing(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao deletar vestuário: ', error)
    }
  }
}
