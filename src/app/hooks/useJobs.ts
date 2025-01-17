import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobService";

/**
 * Custom hook to fetch and manage job data.
 * @returns Object containing jobs, loading state, and error state.
 */
const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs(); // Axios call through jobService
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return { jobs, loading, error };
};

export default useJobs;
