import axios from "axios";

/**
 * Main Axios configuration for API calls.
 * Centralizes the base URL and request/response interceptors.
 */

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // API base URL
  timeout: 10000, // 10-second timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request interceptor to add authentication token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config;
  },
  (error) => {
    // Handle errors in request configuration
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and responses
apiClient.interceptors.response.use(
  (response) => response, // Pass the response data if no error occurs
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle authentication errors (e.g., redirect to login page)
      console.error("Unauthorized: User authentication required.");
    } else if (error.response && error.response.status === 403) {
      // Handle forbidden errors (e.g., insufficient permissions)
      console.error("Forbidden: Access denied.");
    } else if (error.response && error.response.status === 500) {
      // Handle server errors
      console.error("Server error: Please try again later.");
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default apiClient;
