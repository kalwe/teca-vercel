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
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error('Erro ao buscar usuário: ', error.response?.data)
      }
      throw new Error('Erro ao buscar usuário: ', error.message)
    }
  },

  async getUserById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error('Erro ao buscar usuário: ', error.response?.data)
      }
      throw new Error('Erro ao buscar usuário: ', error.message)
    }
  },

  async updateUser(id: number, userData: Partial<UserInput>) {
    try {
      const response = await api.put(`${endpoint}/${id}`, userData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error('Erro ao atualizar usuário: ', error.response?.data)
      }
      throw new Error('Erro ao atualizar usuário: ', error.message)
    }
  },

  async deleteUser(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error('Erro ao excluir usuário: ', error.response?.data)
      }
      throw new Error('Erro ao excluir usuário: ', error.message)
    }
  },
}
