import api from "./api"
import { AddressType } from "../types/address"

// import { createAddressMock, getAddressByIdMock, getAllAddressesMock, updateAddressMock, deleteAddressMock } from "../../../tests/api/addressMock"

const endpoint = "/address"

export const AddressService = {

   async createAddress(addressData: AddressType) {
    try {
      const response = await api.post(endpoint, addressData)
      if (response.status == 201)
        return response.data

      // TODO: validar se for erro


      // const createdMock = createAddressMock(addressData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },

  async getAddressById(addressData: AddressType) { // FIXME: como vai buscar um address pelo id se nao passa o id e sim um AddressType e nem junta no enpoint
    try {
      const response = await api.get(endpoint, addressData)
      if (response.status == 201) // FIXME: codgio 201 e apenas para criar demais sao 200
        return response.data

      // TODO: validar se for erro
    } catch (error) {
      console.error("Erro ao pegar endereço:", error)
      throw error
    }
  },

  async getAllAddresses(): Promise<any[]> { // TODO: muito importante verificar se pega o retorno da primisse ao chamar esse metodo
    try {
      const response = await api.get(endpoint)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar todos os endereços:", error)
      throw error
    }
  },

  async updateAddress(id: number, addressData: any): Promise<any> { // TODO: remove "addressData: any" and use "addressData: AddressType"
    try {
      const response = await api.put(`${endpoint}/${id}`, addressData)
      return response.data
      // const updatedMock = updateAddressMock(id, addressData)
      // return updatedMock
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error)
      throw error
    }
  },

  async deleteAddress(id: number): Promise {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error("Erro ao deletar endereço:", error)
      throw error
    }
  },
}
