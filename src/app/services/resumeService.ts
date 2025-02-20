import api from "./api";

const endpoint = "/resume";

export const ResumeService = {
  /**
   * Faz o upload de um arquivo de currículo.
   * @param formData - FormData contendo o arquivo para upload.
   * @returns Promise resolvendo com a resposta do servidor.
   */
  async uploadResumeFile(formData) {
    try {
      const response = await api.post(`${endpoint}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao fazer upload do currículo:", error);
      throw error;
    }
  },

  /**
   * Cria um novo currículo.
   * @param resumeData - Dados do currículo.
   * @returns Promise resolvendo com os dados do currículo criado.
   */
  async createResume(resumeData) {
    try {
      const response = await api.post(endpoint, resumeData);
      if (response.status === 201) return response.data;
    } catch (error) {
      console.error("Erro ao criar currículo:", error);
      throw error;
    }
  },

  /**
   * Atualiza um currículo existente.
   * @param id - O ID do currículo a ser atualizado.
   * @param resumeData - Dados do currículo a serem atualizados.
   * @returns Promise resolvendo com os dados atualizados do currículo.
   */
  async updateResume(id, resumeData) {
    try {
      const response = await api.put(`${endpoint}/${id}`, resumeData);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      throw error;
    }
  },

  /**
   * Obtém um currículo pelo ID.
   * @param id - O ID do currículo a ser recuperado.
   * @returns Promise resolvendo com os dados do currículo.
   */
  async getResumeById(id) {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("Erro ao obter currículo pelo ID:", error);
      throw error;
    }
  },

  /**
   * Obtém todos os currículos.
   * @param page - Número da página para paginação (opcional).
   * @returns Promise resolvendo com a lista de currículos.
   */
  async getAllResumes(page = 1) {
    try {
      const response = await api.get(`${endpoint}?page=${page}`);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("Erro ao obter lista de currículos:", error);
      throw error;
    }
  },

  /**
   * Deleta um currículo pelo ID.
   * @param id - O ID do currículo a ser deletado.
   * @returns Promise resolvendo quando a exclusão for concluída.
   */
  async deleteResume(id) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("Erro ao deletar currículo:", error);
      throw error;
    }
  },
};
