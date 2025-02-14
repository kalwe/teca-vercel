import api from "./api"

const endpoint = '/resume'

export const ResumeService = {

  /**
   * @param resumeData - Object containing resume details.
   * @returns Promise resolving with the created resume data.
   */
async createResume (resumeData) {
    try {
      const response = await api.post(endpoint, resumeData)
      if (response.status == 201)
        return response.data
    } catch (error) {
      console.error("Error creating resume:", error)
      throw error
    }
  },

  /**
   * @param id - The ID of the resume to update.
   * @param resumeData
  */
  async updateResume(id: number, resumeData) {
    try {
      const response = await api.put(`${endpoint}/${id}`, resumeData)
      if (response.status === 200) {
        return response.data
    }
    // TODO: validar se for erro
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error)
      throw error
    }
  }
}
