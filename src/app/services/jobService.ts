import apiClient from "./api";

/**
 * Service for job-related API operations.
 * Provides functions for creating, fetching, updating, and deleting jobs.
 */

/**
 * Create a new job posting.
 * @param jobData - Object containing job details.
 * @returns Promise resolving with the created job data.
 */
export const createJob = async (jobData: { title: string; description: string; salary: number }) => {
  try {
    const response = await apiClient.post("/jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

/**
 * Fetch a list of job postings.
 * @returns Promise resolving with the list of job postings.
 */
export const fetchJobs = async () => {
  try {
    const response = await apiClient.get("/jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

/**
 * Fetch a single job posting by ID.
 * @param jobId - The ID of the job to fetch.
 * @returns Promise resolving with the job's data.
 */
export const fetchJobById = async (jobId: string) => {
  try {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

/**
 * Update a job posting by ID.
 * @param jobId - The ID of the job to update.
 * @param jobData - Object containing the updated job details.
 * @returns Promise resolving with the updated job data.
 */
export const updateJob = async (
  jobId: string,
  jobData: { title?: string; description?: string; salary?: number }
) => {
  try {
    const response = await apiClient.put(`/jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

/**
 * Delete a job posting by ID.
 * @param jobId - The ID of the job to delete.
 * @returns Promise resolving when the job is successfully deleted.
 */
export const deleteJob = async (jobId: string) => {
  try {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
