import { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

/**
 * Custom hook to fetch and manage user data.
 * @returns Object containing users, loading state, and error state.
 */
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(); // Axios call through userService
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};

export default useUsers;
