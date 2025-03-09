
import api from "./api"


const endpoint = '/position'


export const PositionService = {

  async getAllPositions(){
    try {
      const response = await api.get(endpoint)
      if (response.status == 200){
      return response.data
      }
    } catch (error) {
      console.error("Erro ao pegar cargo:", error)
    }
  },
};


export const RoleService = {
  /**
   * Fetches all functions (roles) from the Python API
   * @returns {Promise<{ id: number; name: string }[]>} - List of functions
   */
  async getAllFunctions(): Promise<{ id: number; name: string }[]> {
    const response = await api.get(API_URL);

    if (Array.isArray(response.data)) {
      return response.data; // API retorna uma lista simples
    } else if (response.data.functions && Array.isArray(response.data.functions)) {
      return response.data.functions; // API encapsula os dados dentro de { functions: [...] }
    } else {
      throw new Error("Unexpected API response format");
    }
  },
};


export const RegionService = {
  /**
   * Fetches all regions from the Python API
   * @returns {Promise<{ id: number; name: string }[]>} - List of regions
   */
  async getAllRegions(): Promise<{ id: number; name: string }[]> {
    const response = await api.get(API_URL);

    if (Array.isArray(response.data)) {
      return response.data; // API retorna uma lista simples
    } else if (response.data.regions && Array.isArray(response.data.regions)) {
      return response.data.regions; // API encapsula os dados dentro de { regions: [...] }
    } else {
      throw new Error("Unexpected API response format");
    }
  },
};
