import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST || '3.95.149.55'
const port = process.env.NEXT_PUBLIC_PORT || '8080'
const api_prefix = 'api/v1'

const api = axios.create({
  baseURL: `http://${host}:${port}/${api_prefix}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// axios.interceptors.request.use(
//   (config) => {
//       const token = localStorage.getItem('token');
//       const accessToken = JSON.parse(String(token))
//
//       // If token is present, add it to request's Authorization Header
//       if (accessToken) {
//           if (config.headers) config.headers.token = accessToken;
//       }
//       return config;
//   },
//   (error) => {
//       // Handle request errors here
//       return Promise.reject(error)
//   }
// )

export default api
