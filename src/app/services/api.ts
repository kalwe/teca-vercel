import axios from "axios";

/**
 * API client for the backend services.
 * Update the baseURL to match your Python backend's base URL.
 */
// TODO: use const from '.env'
// API_URL=""/api/v1"
// HOST="127.0.0.1"
// PORT=5001
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your Python backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;