import apiClient from "./apiClient";

/**
 * Service for user-related API operations.
 * Provides functions for creating, fetching, updating, and deleting users.
 */

/**
 * Create a new user.
 * @param userData - Object containing user details (name, email, password).
 * @returns Promise resolving with the created user data.
 */
export const createUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Fetch a list of users.
 * @returns Promise resolving with the list of users.
 */
export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Fetch a single user by ID.
 * @param userId - The ID of the user to fetch.
 * @returns Promise resolving with the user's data.
 */
export const fetchUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

/**
 * Update a user by ID.
 * @param userId - The ID of the user to update.
 * @param userData - Object containing the updated user details.
 * @returns Promise resolving with the updated user data.
 */
export const updateUser = async (userId: string, userData: { name?: string; email?: string }) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

/**
 * Delete a user by ID.
 * @param userId - The ID of the user to delete.
 * @returns Promise resolving when the user is successfully deleted.
 */
export const deleteUser = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
