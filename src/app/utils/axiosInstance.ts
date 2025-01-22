import axios from 'axios';

// Criar uma instância do Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // URL base da API
  timeout: 10000, // Tempo máximo para uma requisição
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar o token de autenticação
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Buscar token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adicionar header de autenticação
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Lidar com erros na requisição
  }
);

// Interceptador para lidar com respostas
axiosInstance.interceptors.response.use(
  (response) => response, // Retornar resposta diretamente se estiver OK
  (error) => {
    if (error.response && error.response.status === 401) {
      // Exemplo: Redirecionar para login em caso de 401
      console.error('Token expirado ou inválido. Redirecionando para login.');
      window.location.href = '/login';
    }
    return Promise.reject(error); // Propagar o erro
  }
);

export default axiosInstance;
