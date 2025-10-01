// mobile/services/api.ts
import axios from "axios";

// Coloque o IP da sua máquina (não use localhost quando rodar no celular)
const API_BASE_URL = "http://localhost:8080/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default api;
