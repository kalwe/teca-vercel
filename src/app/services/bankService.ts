import { BankAccountType } from "../types/BankAccount";
import api from "./api"; //  Importa a instância do Axios configurada

const endpoint = "/bank-account"; //  Define o endpoint base

export const BankService = {
  /**
   *  Cria uma nova conta bancária para um funcionário
   * @param {object} bankData - Dados da conta bancária
   * @returns {Promise<any>} - Resposta da API
   */
  async createBankAccount(BankAccountData: BankAccountType) {
    try {
      const response = await api.post(endpoint, BankAccountData)
      if (response.status == 201)
        return response.data

      // TODO: validar se for erro

      // const createdMock = createBankAccountMock(BankAccountData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao cadastrar dados bancário", error)
      throw error
    }
  },
  /**
   * 🔍 Busca uma conta bancária pelo ID
   * @param {number} id - ID da conta bancária
   * @returns {Promise<any>} - Dados da conta bancária
   */
  async getBankAccountById(id: number): Promise<any> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar conta bancária:", error);
      throw error;
    }
  },

  /**
   * 📋 Retorna todas as contas bancárias cadastradas
   * @returns {Promise<any[]>} - Lista de contas bancárias
   */
  async getAllBankAccounts(): Promise<any[]> {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todas as contas bancárias:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza uma conta bancária existente
   * @param {number} id - ID da conta bancária
   * @param {object} bankData - Novos dados da conta bancária
   * @returns {Promise<any>} - Dados atualizados
   */
  async updateBankAccount(id: number, bankData: any): Promise<any> {
    try {
      const response = await api.put(`${endpoint}/${id}`, bankData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar conta bancária:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui uma conta bancária pelo ID
   * @param {number} id - ID da conta bancária a ser removida
   * @returns {Promise<any>} - Confirmação da exclusão
   */
  async deleteBankAccount(id: number): Promise<any> {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar conta bancária:", error);
      throw error;
    }
  },
};
