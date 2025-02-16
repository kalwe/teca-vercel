import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("✅ Base URL da API:", api.defaults.baseURL); // Debug

export default api;
