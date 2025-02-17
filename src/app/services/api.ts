import axios from 'axios';

/**
 * API client for the backend services.
 * Update the baseURL to match your Python backend's base URL.
 */

// TODO: use const from '.env'
const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || 3001;
const api_suffix = 'api/v1';

const api = axios.create({
  baseURL: `http://${host}:${port}/${api_suffix}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
