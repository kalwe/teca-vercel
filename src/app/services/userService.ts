import { AxiosError } from 'axios';
import api from './api';

const endpoint = '/user';

export const UserService = {
  async getUsers() {
    try {
      const response = await api.get(endpoint);
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(' Erro ao buscar usuário:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar usuário.');
      }
    }
  },

  async getUserById(id: number) {
    if (!id) throw new Error('ID inválido fornecido para buscar usuário.');

    try {
      const response = await api.get(`${endpoint}/${id}`);
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(' Erro ao buscar usuário:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Erro ao buscar usuário.');
      }
    }
  },

  async updateUser(id: number, userData: any) {
    if (!id) throw new Error('ID inválido fornecido para atualizar usuário.');

    try {
      // const validatedData = userInputSchema.partial().parse(userData);
      const response = await api.put(`${endpoint}/${id}`, userData);
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          ' Erro ao atualizar usuário:',
          error.response?.data || error.message,
        );
        throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário.');
      }
    }
  },

  async deleteUser(id: number) {
    if (!id) throw new Error('ID inválido fornecido para deletar usuário.');
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      if (response.status == 204) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(' Erro ao excluir usuário:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Erro ao excluir usuário.');
      }
    }
  },
};
