import api from "./api"

// import { createAddressMock, getAddressByIdMock, getAllAddressesMock, updateAddressMock, deleteAddressMock } from "../../../tests/api/addressMock"

const endpoint = "/address"

export const AddressService = {

   async createAddress(addressData: AddressSchema) {
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

  async getAddressById(id: number): Promise<any> {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      return response.data
      // const getByIdMock = getAddressByIdMock
      // return getByIdMock
    } catch (error) {
      console.error("Erro ao buscar endereço:", error)
      throw error
    }
  },

  async getAllAddresses(): Promise<any[]> {
    try {
      const response = await api.get(endpoint)
      return response.data
      // const getAllMock = getAllAddressesMock()
      // return getAllMock
    } catch (error) {
      console.error("Erro ao buscar todos os endereços:", error)
      throw error
    }
  },

  async updateAddress(id: number, addressData: any): Promise<any> {
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

  async deleteAddress(id: number): Promise<any> {
    try {
      // const response = await api.delete(`${endpoint}/${id}`)
      // return response.data
      const deletedMock = deleteAddressMock(id)
      return deletedMock
    } catch (error) {
      console.error("Erro ao deletar endereço:", error)
      throw error
    }
  },
}
