import { AxiosError } from 'axios'
import { UserInput } from '../schemas/userSchema'
import api from './api'

const endpoint = '/user'

export const UserService = {
  async getUsers() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao buscar usuário: ', error.response?.data)
      }
    }
  },

  async getUserById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao buscar usuário: ', error.response?.data)
      }
    }
  },

  async updateUser(id: any, userData: Partial<UserInput>) {
    try {
      const response = await api.put(`${endpoint}/${id}`, userData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao atualizar usuário: ', error.response?.data)
      }
    }
  },

  async deleteUser(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao excluir usuário: ', error.response?.data)
      }
    }
  }
}
