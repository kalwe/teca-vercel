import axios from "axios"; // Corrigindo erro de axios.isAxiosError
import api from "./api";
import { userInputSchema, userOutputSchema } from "../schemas/userSchema";
import { z } from "zod";

const endpoint = "/user";

export const UserService = {
  /**
   * Cria um novo usuário com validação
   * @param {UserType} userData - Dados do usuário
   * @returns {Promise<UserType>} - Resposta da API validada
   */
  async createUser(userData: UserType): Promise<UserType> {
    try {
      const response = await api.post(endpoint, userData);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Erro do Axios:", error.response?.data || error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
      throw new Error(error.response?.data?.message || "Erro ao criar usuário.");
    }
  },

  /**
   * Busca todos os usuários
   * @returns {Promise<UserType[]>} - Lista de usuários validados
   */
  async getUsers(): Promise<UserType[]> {
    try {
      const response = await api.get(endpoint, {
        validateStatus: (status) => status >= 200 && status < 300, // Qualquer código 2xx é válido
      });

      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar usuários:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar usuários.");
    }
  },

  /**
   * Busca um usuário pelo ID
   * @param {number} userId - ID do usuário
   *
   */
  async getUserById(userId: number) {
    if (!userId) throw new Error("ID inválido fornecido para buscar usuário.");

    try {
        console.log(" Buscando usuário com ID:", userId);
        const response = await api.get(`${endpoint}/${userId}`, {
            validateStatus: (status) => status >= 200 && status < 300,
        });
        console.log("Resposta da API:", response.data[0]);
      return response.data
    } catch (error: any) {
        console.error(" Erro ao buscar usuário:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Erro ao buscar usuário.");
    }
},


  /**
   * Atualiza um usuário existente com validação
   * @param {number} userId - ID do usuário
   * @param {Partial<z.infer<typeof userInputSchema>>} userData - Novos dados do usuário
   *
   */
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>){
    if (!userId || isNaN(userId)) throw new Error("ID inválido fornecido para atualizar usuário.");

    try {
      const validatedData = userInputSchema.partial().parse(userData);
      const response = await api.put(`${endpoint}/${userId}`, validatedData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }
  ,

  /**
   * Exclui um usuário pelo ID
   * @param {number} userId - ID do usuário a ser removido
   *
   */
  async deleteUser(userId: number){
    if (!userId) throw new Error("ID inválido fornecido para deletar usuário.");
    try {
      await api.delete(`${endpoint}/${userId}`, {
        validateStatus: (status) => status === 204,
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao excluir usuário.");
    }
  },
};
