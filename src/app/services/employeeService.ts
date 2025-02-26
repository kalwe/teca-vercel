import { EmployeeType } from '../types/employee';
import api from './api'; // Importa a instância do Axios configurada

const endpoint = '/employee';

export const EmployeeService = {
  async createEmployee(EmployeeData: EmployeeType) {
    try {
      console.log(' Enviando dados para criação:', EmployeeData);

      const response = await api.post(endpoint, EmployeeData);

      if (response.status === 201) {
        console.log(' Funcionário criado com sucesso!', response.data);
        return response.data;
      }
    } catch (error) {
      console.error(' Erro ao salvar funcionário:', error);
    }
  },

  async getEmployeeById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error);
    }
  },
  async getAllEmployees(page: number) {
    try {
      const response = await api.get(`${endpoint}?page=${page}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao buscar todos os funcionários:', error);
      return [];
    }
  },
  
  async updateEmployee(id: number, employeeData: Partial<EmployeeType>) {
    try {
      const response = await api.put(`${endpoint}/${id}`, employeeData);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
    }
  },

  async deleteEmployee(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);

      if (response.status === 204) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  },
};
