import apiClient from "./apiClient";

/**
 * Service for employee-related API operations.
 * Provides functions for creating, fetching, updating, and deleting employees.
 */

/**
 * Create a new employee.
 * @param employeeData - Object containing employee details.
 * @returns Promise resolving with the created employee data.
 */
export const createEmployee = async (employeeData: { name: string; position: string; salary: number }) => {
  try {
    const response = await apiClient.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

/**
 * Fetch a list of employees.
 * @returns Promise resolving with the list of employees.
 */
export const fetchEmployees = async () => {
  try {
    const response = await apiClient.get("/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

/**
 * Fetch a single employee by ID.
 * @param employeeId - The ID of the employee to fetch.
 * @returns Promise resolving with the employee's data.
 */
export const fetchEmployeeById = async (employeeId: string) => {
  try {
    const response = await apiClient.get(`/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    throw error;
  }
};

/**
 * Update an employee by ID.
 * @param employeeId - The ID of the employee to update.
 * @param employeeData - Object containing the updated employee details.
 * @returns Promise resolving with the updated employee data.
 */
export const updateEmployee = async (
  employeeId: string,
  employeeData: { name?: string; position?: string; salary?: number }
) => {
  try {
    const response = await apiClient.put(`/employees/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

/**
 * Delete an employee by ID.
 * @param employeeId - The ID of the employee to delete.
 * @returns Promise resolving when the employee is successfully deleted.
 */
export const deleteEmployee = async (employeeId: string) => {
  try {
    const response = await apiClient.delete(`/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
