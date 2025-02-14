import api from "./api" // Importa a instância do Axios configurada

const endpoint = "/employee"

export const EmployeeService = {
  /**
   * Cria um novo funcionário
   * @param {object} employeeData - Dados do funcionário
   * @returns {Promise} - Resposta da API
   */
  async createEmployee(EmployeeData: EmployeeType) {
    try {
      const response = await api.post(endpoint, EmployeeData)
      if (response.status == 201)
        return response.data

      // TODO: validar se for erro
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },

  /**
   * Busca um funcionário por ID
   * @param {number} id - ID do funcionário
   */
  async getEmployeeById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`)
      if (response.status == 200)
        return response.data

      // TODO: validar se for erro
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },

  /**
   * Busca todos os funcionários cadastrados
   * @returns {Promise} - Lista de funcionários
   */
  async getAllEmployees() {
  try {
    const response = await api.get(endpoint)
    if (response.status == 200)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar todos os funcionários:", error)
      throw error
    }
  },

  /**
   * Atualiza um funcionário existente
   * @param {number} id - ID do funcionário
   * @param {object} employeeData - Novos dados do funcionário
   * @returns {Promise} - Dados atualizados
   */
  async updateEmployee(id: number, employeeData) {
    try {
      const response = await api.put(`${endpoint}/${id}`, employeeData)
      if (response.data == 200)
        return response.data
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error)
      throw error
    }
  },

  /**
   * Exclui um funcionário pelo ID
   * @param {number} id - ID do funcionário a ser removido
   * @returns {Promise} - Confirmação da exclusão
   */

  // user "async deleteEmployee(id: number) {""
  async deleteEmployee(id: number) {
    try {
      const response = await api.delete(`${endpoint}/${id}`)
      if (response.status == 200)
        return response.data
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error)
      throw error
    }
  },
}
