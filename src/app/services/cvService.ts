
import { Cv } from "../types/cv"
import { cvSchema } from "../schemas/cvSchema"
import axios from "axios" // TODO: usar instancia from api.ts

const API_URL = "https://seu-api.com/cvs" // TODO: passar apenas endpoint ex: const endpoint = '/curriculuo'


export const CvService = {
  /**
   * Cria um novo currículo
   * @param {Cv} cvData - Dados do currículo
   * @returns {Promise<Cv>} - Resposta validada da API
   */
  async createCv(cvData: Cv): Promise<Cv> {
    try {
      // Validação antes do envio
      cvSchema.parse(cvData) // TODO: deve pegar o dado validado ex: 'const validatedCvData = cvSchema.parse(cvData)' e passar no axios.post

      const response = await axios.post(API_URL, cvData, {
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
   * @returns {Promise<Cv>} - Dados do currículo
   */
  async getCvById(id: number): Promise<Cv> {
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
   * @returns {Promise<Cv[]>} - Lista de currículos
   */
  async getAllCvs(): Promise<Cv[]> {
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
   * @param {Partial<Cv>} cvData - Novos dados do currículo
   * @returns {Promise<Cv>} - Dados atualizados
   */
  async updateCv(id: number, cvData: Partial<Cv>): Promise<Cv> {
    if (!id) throw new Error("ID inválido fornecido para atualizar currículo.")
    try {
      // Validação antes do envio
      cvSchema.parse(cvData) // TODO: mesmo coisa que que cvCreate() linha 19
      const response = await axios.patch(`${API_URL}/${id}`, cvData, { // TODO: method nao pode ser patch, deve ser PUT
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
  async deleteCv(id: number): Promise<void> {
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
