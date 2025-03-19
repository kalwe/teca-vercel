import { AxiosError } from 'axios'
import api from './api'

const endpoint = '/employee'

export const EmployeeService = {
  async createEmployee(employeeData: any) {
    try {
      const response = await api.post(endpoint, employeeData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao criar funcionário:', error)
    }
  },

  async getEmployeeById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao buscar funcionário por ID:', error)
    }
  },

  async getAllEmployees() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao buscar todos os funcionários:', error)
    }
  },

  async updateEmployee(id: any, employeeData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, employeeData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao atualizar funcionário:', error)
    }
  },

  async deleteEmployee(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.response?.data)
      }
      console.error('Erro ao deletar funcionário:', error)
    }
  }
}
