import axios from 'axios';

/**
 * API client for the backend services.
 * Update the baseURL to match your Python backend's base URL.
 */

// TODO: use const from '.env'
// const HOST = "127.0.0.1"
// const PORT = "3001"
// const API_URL = "api/v1"

const api = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
