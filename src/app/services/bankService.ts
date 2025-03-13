import api from './api' //  Importa a instância do Axios configurada

const endpoint = '/bank-account' //  Define o endpoint base

export const BankService = {
  async createBankAccount(BankAccountData: any) {
    try {
      const response = await api.post(endpoint, BankAccountData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      console.error('Erro ao cadastrar dados bancário', error)
    }
  },

  async getBankAccountById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar conta bancária:', error)
    }
  },

  async getAllBankAccounts() {
    try {
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error(' Erro ao buscar todas as contas bancárias:', error)
    }
  },

  async updateBankAccount(id: any, bankData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, bankData)
      return response.data
    } catch (error) {
      console.error(' Erro ao atualizar conta bancária:', error)
    }
  },

  async deleteBankAccount(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error(' Erro ao deletar conta bancária:', error)
    }
  }
}
