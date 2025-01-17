import { useState, useEffect } from "react";
import { fetchEmployees } from "../services/employeeService";

/**
 * Custom hook to fetch and manage employee data.
 * @returns Object containing employees, loading state, and error state.
 */
const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(); // Axios call through employeeService
        setEmployees(data);
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return { employees, loading, error };
};

export default useEmployees;
