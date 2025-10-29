import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚙️ Cria a instância base do Axios
const api = axios.create({
  baseURL: "http://localhost:8080/api", // 👈 ajuste se estiver em outro IP
  timeout: 5000,
});

// 📦 Interceptor para incluir o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  console.log("🌐 [API REQUEST]");
  console.log("➡️ URL:", `${config.baseURL}${config.url}`);
  console.log("➡️ Method:", config.method?.toUpperCase());
  console.log("➡️ Token:", token ? token.substring(0, 30) + "..." : "❌ nenhum token encontrado");
  console.log("➡️ Headers antes:", config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("➡️ Headers finais:", config.headers);

  return config;
});

// 📩 Interceptor de resposta para capturar erros HTTP
api.interceptors.response.use(
  (response) => {
    console.log("✅ [API RESPONSE]", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ [API ERROR]");
    console.error("URL:", error.config?.baseURL + error.config?.url);
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
