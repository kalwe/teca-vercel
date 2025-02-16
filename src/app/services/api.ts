import axios from "axios";

/**
 * API client for the backend services.
 * Update the baseURL to match your Python backend's base URL.
 */

// TODO: use const from '.env'
const HOST = "127.0.0.1"
const PORT = "3001"
const API_URL = "api/v1"

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/${API_URL}`, // Replace with your Python backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
