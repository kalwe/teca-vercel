import api from './api'

const endpoint = '/resume';

export const ResumeService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadResumeFile(formData: any, _file: File) {
    try {
      const response = await api.post(`${endpoint}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao fazer upload do currículo:', error);
    }
  },

  async createResume(resumeData: any) {
    try {
      const response = await api.post(endpoint, resumeData);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao criar currículo:', error);
    }
  },

  async updateResume(id: any, resumeData: any) {
    try {
      const response = await api.put(`${endpoint}/${id}`, resumeData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
    }
  },

  async getResumeById(id: any) {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao obter currículo pelo ID:', error);
    }
  },

  async getAllResumes() {
    try {
      const response = await api.get(`${endpoint}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao obter lista de currículos:', error);
    }
  },

  async deleteResume(id: any) {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      if (response.status === 204) {
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao deletar currículo:', error);
    }
  },
};
