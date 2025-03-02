import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST || 'localhost'
const port = process.env.NEXT_PUBLIC_PORT || 3001
const api_prefix = 'api/v1'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || `http://${host}:${port}/${api_prefix}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
