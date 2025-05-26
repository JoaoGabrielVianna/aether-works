import { createContext, useContext, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContextType } from "./auth.types";
import * as authService from "./auth.service";
import { User } from "@/models/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.mockedUsers[0] ?? null); // opcional inicializar
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(!!user);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      setIsSignedIn(true);
      router.replace("/home");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsSignedIn(false);
      router.replace("/(auth)/signIn");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(email, password);
      setUser(newUser);
      setIsSignedIn(true);
      router.replace("/home");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, isLoading, isSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
