import api from './api'

const endpoint = '/employee';

export const EmployeeService = {
  async createEmployee(employeeData: any) {
    try {
      const response = await api.post(endpoint, employeeData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      throw error;
    }
  },

  async getEmployeeById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar funcionário por ID:', error);
      throw error;
    }
  },

  async getAllEmployees() {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os funcionários:', error);
      return []; // retorna array vazio para evitar lançar exceção
    }
  }
  ,

  async updateEmployee(id: any, employeeData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw error;
    }
  },

  async deleteEmployee(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw error;
    }
  },
};
