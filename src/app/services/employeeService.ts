import api from "./api"; // Importa a instância do Axios configurada

const endpoint = "/employee";

export const EmployeeService = {
  /**
   * Cria um novo funcionário
   * @param {object} employeeData - Dados do funcionário
   *  - Resposta da API
   */
  async createEmployee(EmployeeData: EmployeeType) {
    try {
      console.log("📤 Enviando dados para criação:", EmployeeData);

      const response = await api.post(endpoint, EmployeeData);

      if (response.status === 201) {
        console.log("✅ Funcionário criado com sucesso!", response.data);
        return response.data;
      } else {
        console.warn("⚠️ Resposta inesperada:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("❌ Erro ao salvar funcionário:", error.response.data);
      } else {
        console.error("❌ Erro inesperado:", error.message);
      }
      throw error;
    }
  },

  /**
   * Busca um funcionário por ID
   * @param {number} id - ID do funcionário
   */
  async getEmployeeById(id: number) {
    try {
      const response = await api.get(`${endpoint}/${id}`);

      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar funcionário por ID:", error);
      throw error;
    }
  },

  /**
   * Busca todos os funcionários cadastrados
   *
   */
  async getAllEmployees() {
    try {
      const response = await api.get(endpoint);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar todos os funcionários:", error);
      throw error;
    }
  },

  /**
   * Atualiza um funcionário existente
   * @param {number} id - ID do funcionário
   * @param {object} employeeData - Novos dados do funcionário
   *  - Dados atualizados
   */
  async updateEmployee(id: number, employeeData: EmployeeType) {
    try {
      console.log("📤 Enviando atualização para ID:", id, "Dados:", employeeData);

      const response = await api.put(`${endpoint}/${id}`, employeeData);

      if (response.status === 200) {
        console.log("✅ Funcionário atualizado com sucesso!", response.data);
        return response.data;
      } else {
        console.warn("⚠️ Resposta inesperada ao atualizar:", response);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar funcionário:", error);
      throw error;
    }
  },

  /**
   * Exclui um funcionário pelo ID
   * @param {number} id - ID do funcionário a ser removido
   *  - Confirmação da exclusão
   */
  async deleteEmployee(id: number) {
    try {
      console.log("📤 Enviando requisição para deletar funcionário ID:", id);

      const response = await api.delete(`${endpoint}/${id}`);

      if (response.status === 200) {
        console.log("✅ Funcionário deletado com sucesso!");
        return response.data;
      } else {
        console.warn("⚠️ Resposta inesperada ao deletar:", response);
      }
    } catch (error) {
      console.error("❌ Erro ao deletar funcionário:", error);
      throw error;
    }
  },
};
