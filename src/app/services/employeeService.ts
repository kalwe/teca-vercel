import { EmployeeType } from '../types/employee'
import api from './api'

const endpoint = '/employee'

export const EmployeeService = {
  async createEmployee(EmployeeData: EmployeeType) {
    try {
      console.log(' Enviando dados para criação:', EmployeeData)

      const response = await api.post(endpoint, EmployeeData)

      if (response.status === 201) {
        console.log(' Funcionário criado com sucesso!', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
    }
  },

  async getEmployeeById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`)

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error)
    }
  },
  async getAllEmployees() {
    try {
<<<<<<< HEAD
      const response = await api.get(endpoint)
=======
      const response = await api.get(`${endpoint}`);
>>>>>>> fix_employee
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('Erro ao buscar todos os funcionários:', error)
=======
      console.error('Erro ao buscar todos os funcionários:', error);
      return [];
>>>>>>> fix_employee
    }
  },

  async updateEmployee(id: number, employeeData: Partial<EmployeeType>) {
    try {
      const response = await api.put(`${endpoint}/${id}`, employeeData)

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error)
    }
  },

  async deleteEmployee(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)

      if (response.status === 204) {
        return response.data
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error)
    }
  },
}
