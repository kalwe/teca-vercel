import axios from "axios";

/**
 * API client for the backend services.
 * Update the baseURL to match your Python backend's base URL.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your Python backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
