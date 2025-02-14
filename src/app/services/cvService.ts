
import { Resume } from "../types/resume"
import { resumeSchema } from "../schemas/resumeSchema"
import axios from "axios" // TODO: usar instancia from api.ts

const API_URL = "https://seu-api.com/resumes" // TODO: passar apenas endpoint ex: const endpoint = '/curriculuo'


export const ResumeService = {
  /**
   * Cria um novo currículo
   * @param {Resume} resumeData - Dados do currículo
   * @returns {Promise<Resume>} - Resposta validada da API
   */
  async createResume(resumeData: Resume): Promise<Resume> {
    try {
      // Validação antes do envio
      resumeSchema.parse(resumeData) // TODO: deve pegar o dado validado ex: 'const validatedResumeData = resumeSchema.parse(resumeData)' e passar no axios.post

      const response = await axios.post(API_URL, resumeData, {
        validateStatus: status => status === 201,
      })

      return response.data
    } catch (error) {
      console.error("Erro ao criar currículo:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao criar currículo.")
    }
  },

  /**
   * Busca um currículo pelo ID
   * @param {number} id - ID do currículo
   * @returns {Promise<Resume>} - Dados do currículo
   */
  async getResumeById(id: number): Promise<Resume> {
    if (!id) throw new Error("ID inválido fornecido para buscar currículo.")
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        validateStatus: status => status === 200,
      })

      return response.data
    } catch (error) {
      console.error("Erro ao buscar currículo:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao buscar currículo.")
    }
  },

  /**
   * Obtém todos os currículos
   * @returns {Promise<Resume[]>} - Lista de currículos
   */
  async getAllResumes(): Promise<Resume[]> {
    try {
      const response = await axios.get(API_URL, {
        validateStatus: status => status === 200,
      })

      return response.data
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao buscar todos os currículos:", error.message)

        if (error.code === "ECONNABORTED") {
          console.error("Erro: Tempo limite da requisição excedido.")
        } else if (error.response) {
          console.error("Erro da API:", error.response.status, error.response.data)
        } else if (error.request) {
          console.error("Nenhuma resposta recebida da API.")
        }
      } else {
        console.error("Erro inesperado ao buscar currículos:", error)
      }
      throw new Error("Erro ao buscar currículos. Verifique sua conexão e tente novamente.")
    }
  },

  /**
   * Atualiza um currículo existente
   * @param {number} id - ID do currículo
   * @param {Partial<Resume>} resumeData - Novos dados do currículo
   * @returns {Promise<Resume>} - Dados atualizados
   */
  async updateResume(id: number, resumeData: Partial<Resume>): Promise<Resume> {
    if (!id) throw new Error("ID inválido fornecido para atualizar currículo.")
    try {
      // Validação antes do envio
      resumeSchema.parse(resumeData) // TODO: mesmo coisa que que resumeCreate() linha 19
      const response = await axios.patch(`${API_URL}/${id}`, resumeData, { // TODO: method nao pode ser patch, deve ser PUT
        validateStatus: status => status === 200,
      })

      return response.data
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao atualizar currículo.")
    }
  },

  /**
   * Exclui um currículo pelo ID
   * @param {number} id - ID do currículo a ser removido
   * @returns {Promise<void>} - Confirmação da exclusão
   */
  async deleteResume(id: number): Promise<void> {
    if (!id) throw new Error("ID inválido fornecido para deletar currículo.")
    try {
      await axios.delete(`${API_URL}/${id}`, {
        validateStatus: status => status === 204,
      })

      // Retorno `void` pois `204 No Content` não tem corpo de resposta
    } catch (error) {
      console.error("Erro ao deletar currículo:", error.response?.data || error.message)
      throw new Error(error.response?.data?.message || "Erro ao deletar currículo.")
    }
  },
}
