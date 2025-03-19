import { AxiosError } from 'axios'
import api from './api' //  Importa a instância do Axios configurada

const endpoint = '/bank'

export const BankService = {
  async createBankAccount(BankAccountData: any) {
    try {
      const response = await api.post(endpoint, BankAccountData)
      if (response.status == 201) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao cadastrar dados bancário: ', error)
    }
  },

  async getBankAccountById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error('Erro ao buscar conta bancária: ', error)
    }
  },

  async getAllBankAccounts() {
    try {
      const response = await api.get(endpoint)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao buscar todas as contas bancárias: ', error)
    }
  },

  async updateBankAccount(id: any, bankData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, bankData)
      if (response.status == 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao atualizar conta bancária: ', error)
    }
  },

  async deleteBankAccount(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 204) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError response.data: ', error.response?.data)
      }
      console.error(' Erro ao deletar conta bancária: ', error)
    }
  }
}
