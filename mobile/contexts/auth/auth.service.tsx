import users from "@/mocks/users.json";
import { User } from "@/models/user";


export const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms));
export let mockedUsers: User[] = [...users];

export async function login(email: string, password: string): Promise<User> {
  await delay();
  const user = mockedUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) throw new Error("Email ou senha incorretos.");
  return user;
}

export async function logout() {
  await delay();
  return;
}

export async function register(email: string, password: string): Promise<User> {
  await delay();
  const exists = mockedUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Este e-mail já está cadastrado.");
  
  const newUser: User = {
    id: mockedUsers.length + 1,
    username: email.split("@")[0],
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  
  mockedUsers.push(newUser);
  return newUser;
}
