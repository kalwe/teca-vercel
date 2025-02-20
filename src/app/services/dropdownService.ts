
import api from "./api";

const API_URL = "http://your-python-api.com/positions"; // Replace with your actual API

export const PositionService = {
  /**
   * Fetches all job positions from the Python API
   * @returns {Promise<{ id: number; name: string }[]>} - List of job positions
   */
  async getAllPositions(): Promise<{ id: number; name: string }[]> {
    const response = await api.get(API_URL);

    if (Array.isArray(response.data)) {
      return response.data; // API returns a plain list
    } else if (response.data.positions && Array.isArray(response.data.positions)) {
      return response.data.positions; // API wraps data inside { positions: [...] }
    } else {
      throw new Error("Unexpected API response format");
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
