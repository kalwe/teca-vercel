"use client";

import { z } from "zod";
import api from "../services/api"; // 🔹 Importação do serviço de API

/**
 * 🔍 Esquema de validação para Endereço
 */
export const addressSchema = z.object({
  street: z
    .string()
    .max(255, "O nome da rua não pode ter mais de 255 caracteres")
    .nonempty("O nome da rua é obrigatório"),
  number: z
    .string()
    .max(8, "O número não pode ter mais de 8 caracteres")
    .nonempty("O número é obrigatório"),
  neighborhood: z
    .string()
    .max(120, "O bairro não pode ter mais de 120 caracteres")
    .nonempty("O bairro é obrigatório"),
  city: z
    .string()
    .max(255, "O nome da cidade não pode ter mais de 255 caracteres")
    .nonempty("O nome da cidade é obrigatório"),
  zip_code: z
    .string()
    .max(9, "O CEP deve estar no formato XXXXX-XXX")
    .regex(/^\d{5}-\d{3}$/, "O CEP deve estar no formato XXXXX-XXX")
    .nonempty("O CEP é obrigatório"),
  state: z
    .string()
    .max(60, "O nome do estado não pode ter mais de 60 caracteres")
    .nonempty("O nome do estado é obrigatório"),
});

// 🔹 Tipo inferido automaticamente pelo Zod
export type AddressInput = z.infer<typeof addressSchema>;

/**
 *  Serviço de API para manipulação de endereços
 */
const endpoint = "/address";

export const AddressService = {
  /**
   *  Cria um novo endereço com validação
   * @param {AddressInput} addressData - Dados do endereço
   * @returns {Promise<AddressInput>} - Endereço criado
   */
  async createAddress(addressData: AddressInput): Promise<AddressInput> {
    try {
      const validatedData = addressSchema.parse(addressData); // ✅ Validação com Zod antes de enviar
      const response = await api.post(endpoint, validatedData);
      return addressSchema.parse(response.data); // ✅ Validação da resposta
    } catch (error) {
      console.error("❌ Erro ao criar endereço:", error);
      throw new Error("Erro ao criar endereço.");
    }
  },

  /**
   * 🔍 Busca um endereço pelo ID
   * @param {number} id - ID do endereço
   * @returns {Promise<AddressInput>} - Dados do endereço
   */
  async getAddressById(id: number): Promise<AddressInput> {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return addressSchema.parse(response.data); // ✅ Validação da resposta
    } catch (error) {
      console.error("❌ Erro ao buscar endereço:", error);
      throw new Error("Erro ao buscar endereço.");
    }
  },

  /**
   * 📜 Obtém todos os endereços cadastrados
   * @returns {Promise<AddressInput[]>} - Lista de endereços
   */
  async getAllAddresses(): Promise<AddressInput[]> {
    try {
      const response = await api.get(endpoint);
      return z.array(addressSchema).parse(response.data); // ✅ Validação da lista de endereços
    } catch (error) {
      console.error("❌ Erro ao buscar todos os endereços:", error);
      throw new Error("Erro ao buscar todos os endereços.");
    }
  },

  /**
   * 🔄 Atualiza um endereço existente
   * @param {number} id - ID do endereço
   * @param {Partial<AddressInput>} addressData - Dados do endereço a serem atualizados
   * @returns {Promise<AddressInput>} - Endereço atualizado
   */
  async updateAddress(id: number, addressData: Partial<AddressInput>): Promise<AddressInput> {
    try {
      const validatedData = addressSchema.partial().parse(addressData); // ✅ Validação parcial antes de enviar
      const response = await api.put(`${endpoint}/${id}`, validatedData);
      return addressSchema.parse(response.data); // ✅ Validação da resposta
    } catch (error) {
      console.error("❌ Erro ao atualizar endereço:", error);
      throw new Error("Erro ao atualizar endereço.");
    }
  },

  /**
   * 🗑️ Exclui um endereço pelo ID
   * @param {number} id - ID do endereço a ser removido
   * @returns {Promise<{ success: boolean }>} - Confirmação da exclusão
   */
  async deleteAddress(id: number): Promise<{ success: boolean }> {
    try {
      await api.delete(`${endpoint}/${id}`);
      return { success: true };
    } catch (error) {
      console.error("❌ Erro ao deletar endereço:", error);
      throw new Error("Erro ao deletar endereço.");
    }
  },
};
