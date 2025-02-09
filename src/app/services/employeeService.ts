import api from "./api"; // Importa a instância do Axios configurada

export const EmployeeService = {
  /**
   * Cria um novo funcionário
   * @param {object} employeeData - Dados do funcionário
   * @returns {Promise} - Resposta da API
   */
  createEmployee: async (employeeData: any) => {
    try {
      const response = await api.post("/employee", employeeData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      throw error;
    }
  },

  /**
   * Busca um funcionário por ID
   * @param {number} id - ID do funcionário
   * @returns {Promise} - Dados do funcionário
   */
  getEmployeeById: async (id: number) => {
    try {
      const response = await api.get(`/employee/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
      throw error;
    }
  },

  /**
   * Busca todos os funcionários cadastrados
   * @returns {Promise} - Lista de funcionários
   */
  getAllEmployees: async () => {
    try {
      const response = await api.get("/employee");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os funcionários:", error);
      throw error;
    }
  },

  /**
   * Atualiza um funcionário existente
   * @param {number} id - ID do funcionário
   * @param {object} employeeData - Novos dados do funcionário
   * @returns {Promise} - Dados atualizados
   */
  updateEmployee: async (id: number, employeeData: any) => {
    try {
      const response = await api.put(`/employee/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      throw error;
    }
  },

  /**
   * Exclui um funcionário pelo ID
   * @param {number} id - ID do funcionário a ser removido
   * @returns {Promise} - Confirmação da exclusão
   */
  deleteEmployee: async (id: number) => {
    try {
      const response = await api.delete(`/employee/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      throw error;
    }
  },
};
