import api from "./api"; // Importa a instância do Axios configurada

// TODO: create const for endpoint


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

      // const createdMock = createEmployeeMock(EmployeeData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },

  /**
   * Busca um funcionário por ID
   * @param {number} id - ID do funcionário
   */
  async getEmployeeById(EmployeeData: EmployeeType) { // FIXME: como voce vai buscar um employee pelo id se passa um "EmployeeType"  e nao adiciona no enpoint?
    try {
      const response = await api.get(endpoint, EmployeeData)
      if (response.status == 201) // FIXME: o codigo 201 serve apenas para criar, os outros sao 200
        return response.data

      // TODO: validar se for erro

      // const createdMock = getEmployeeByIdMock(EmployeeData)
      // return createdMock
    } catch (error) {
      console.error("Erro ao criar endereço:", error)
      throw error
    }
  },

  /**
   * Busca todos os funcionários cadastrados
   * @returns {Promise} - Lista de funcionários
   */
  getAllEmployees: async (page: number) => { // TODO: odne voce usa page?
    try {
      const response = await api.get("/employee"); // TODO: usar "const endpoint = '/employee' " em api.delete()
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
  updateEmployee: async (id: number, employeeData) => {
    try {
      const response = await api.put(`/employee/${id}`, employeeData); // TODO: usar "const endpoint = '/employee' " em api.delete()
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
  // TODO: declarar deleteEmployee como methodo, dessa forma voce esta typando, varios estao assim
  // user "async deleteEmployee(id: number) {""
  deleteEmployee: async (id: number) => {
    try {
      const response = await api.delete(`/employee/${id}`); // TODO: usar "const endpoint = '/employee' " em api.delete()
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      throw error;
    }
  },
};
