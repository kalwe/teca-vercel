import { useState, useEffect } from "react";
import { fetchResumes } from "../services/resumeService";

/**
 * Custom hook to fetch and manage resume data.
 * @returns Object containing resumes, loading state, and error state.
 */
const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await fetchResumes(); // Axios call through resumeService
        setResumes(data);
      } catch (err) {
        setError("Failed to fetch resumes.");
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, []);

  return { resumes, loading, error };
};

export default useResumes;
