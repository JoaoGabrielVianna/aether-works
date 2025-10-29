import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models/user";

interface LoginResponse {
  token: string;
  user: User;
}

// 🔐 LOGIN --------------------------------------------------
export async function login(email: string, password: string): Promise<User> {
  console.log("🔑 Fazendo login com:", email);

  const { data } = await api.post<LoginResponse>("/auth/login", { email, password });

  console.log("✅ Login bem-sucedido. Token recebido:", data.token.substring(0, 30) + "...");

  // 🔒 Salva token e usuário no AsyncStorage
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));

  // Define header padrão no Axios
  api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  return data.user;
}

// 🆕 REGISTER --------------------------------------------------
export async function register(email: string, password: string): Promise<User> {
  console.log("🧾 Registrando novo usuário:", email);

  const { data } = await api.post<LoginResponse>("/auth/register", {
    name: email.split("@")[0],
    email,
    password,
  });

  console.log("✅ Registro bem-sucedido. Token recebido:", data.token.substring(0, 30) + "...");

  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  return data.user;
}

// 🚪 LOGOUT --------------------------------------------------
export async function logout(): Promise<void> {
  console.log("🚪 Limpando sessão...");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
  delete api.defaults.headers.common["Authorization"];
}

// ♻️ CARREGAR USUÁRIO SALVO ----------------------------------
export async function loadStoredUser(): Promise<User | null> {
  const storedUser = await AsyncStorage.getItem("user");
  const token = await AsyncStorage.getItem("token");

  console.log("♻️ Carregando sessão...");
  console.log("Token recuperado:", token ? token.substring(0, 30) + "..." : "❌ nenhum token");

  if (storedUser && token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return JSON.parse(storedUser);
  }

  return null;
}
