import apiClient from "./api";

/**
 * Service for resume-related API operations.
 * Provides functions for creating, fetching, updating, and deleting resumes.
 */

/**
 * Create a new resume.
 * @param resumeData - Object containing resume details.
 * @returns Promise resolving with the created resume data.
 */
export const createResume = async (resumeData: { candidateName: string; skills: string[]; experience: string }) => {
  try {
    const response = await apiClient.post("/resumes", resumeData);
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};

/**
 * Fetch a list of resumes.
 * @returns Promise resolving with the list of resumes.
 */
export const fetchResumes = async () => {
  try {
    const response = await apiClient.get("/resumes");
    return response.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
};

/**
 * Fetch a single resume by ID.
 * @param resumeId - The ID of the resume to fetch.
 * @returns Promise resolving with the resume's data.
 */
export const fetchResumeById = async (resumeId: string) => {
  try {
    const response = await apiClient.get(`/resumes/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    throw error;
  }
};

/**
 * Update a resume by ID.
 * @param resumeId - The ID of the resume to update.
 * @param resumeData - Object containing the updated resume details.
 * @returns Promise resolving with the updated resume data.
 */
export const updateResume = async (endpoint: string, addressData) => {
  try {
    const response = await api.put(endpoint, addressData);
    if (response.status === 201) {
      return response.data;
    }

    // TODO: validar se for erro
    throw new Error("Erro ao atualizar o currículo");

  } catch (error) {
    console.error("Erro ao atualizar currículo:", error);
    throw error;
  }
};



/**
 * Delete a resume by ID. // FIXME: como voce vai deletar um resume pelo ID se nos params voce passa um addresData que ate pode vir um id ali, porem voce nao junta com o endpoint na chama do axios "api.delete(endpoint, addressData)", mas tudo bem pq nao usa esse metodo deleteResume em lugar nehum...
 * @param resumeId - The ID of the resume to delete.
 * @returns Promise resolving when the resume is successfully deleted.
 */

export const deleteResume = async (endpoint: string, addressData) => {
  try {
    const response = await api.delete(endpoint, addressData);
    if (response.status === 201) { // FIXME: o codigo de retorno 201 significa  que o item foi criado na api, o codigo para deletar "NO_CONTENT = 204"
      return response.data;
    }

    // TODO: validar se for erro
    throw new Error("Erro ao deletar curriculo");

  } catch (error) {
    console.error("Erro ao deletar currículo:", error);
    throw error;
  }
};
