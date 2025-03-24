import axios from 'axios'

const api_host = 'ec2-3-95-149-55.compute-1.amazonaws.com'
const api_port = '8080'
const api_prefix = 'api/v1'
const api_protocol = 'http'
const api_url = `${api_protocol}://${api_host}:${api_port}/${api_prefix}`

const axios_header = {
  'Content-Type': 'application/json'
}

// const axios_header_multpart = {
//   'Content-Type': 'multipart/form-data'
// }

const api = axios.create({
  baseURL: `${api_url}`,
  headers: axios_header
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
