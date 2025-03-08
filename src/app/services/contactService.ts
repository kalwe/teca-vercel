import { Contact } from "../types/contact"
import api from "./api"

const endpoint = '/contact';

export const ContactService = {
  async createContact(contactData: Contact) {
    try {
      const response = await api.post(endpoint, {
        ...contactData,
        employee: { id: contactData.employeeId },
      });

      if (response.status === 201) return response.data;
    } catch (error) {
      console.error("Erro ao criar contato:", error);
      throw error;
    }
  },

  async getContactById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
      throw error;
    }
  },

  async getAllContacts() {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os contatos:", error);
      throw error;
    }
  },

  async updateContact(id: number, contactData: Partial<Contact>) {
    try {
      const response = await api.put(`${endpoint}/${id}`, {
        ...contactData,
        employee: { id: contactData.employeeId },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
      throw error;
    }
  },

  async deleteContact(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
      throw error;
    }
  },
};
