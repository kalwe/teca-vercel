import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/address'

export const AddressService = {
  async createAddress(addressData: any) {
    try {
      const response = await api.post(endpoint, addressData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao criar endereço: ', error)
    }
  },

  async getAddressById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao pegar endereço: ', error)
    }
  },

  async getAllAddresses() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao buscar todos os endereços: ', error)
    }
  },

  async updateAddress(id: any, addressData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, addressData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao atualizar endereço:', error)
    }
  },

  async deleteAddress(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao deletar endereço: ', error)
    }
  }
}
