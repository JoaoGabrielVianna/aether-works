import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContextType } from "./auth.types";
import * as authService from "./auth.service";
import { User } from "@/models/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  // 🔁 restaura a sessão ao abrir o app
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedUser = await authService.loadStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsSignedIn(true);
          router.replace("/(root)/home");
        } else {
          router.replace("/(auth)/signIn");
        }
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  // 🔐 login real (usa backend /auth/login)
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      setIsSignedIn(true);
      router.replace("/(root)/home");
    } finally {
      setIsLoading(false);
    }
  };

  // 🚪 logout
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

  // 🆕 cadastro (usa backend /api/users)
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(email, password);
      setUser(newUser);
      setIsSignedIn(true);
      router.replace("/(root)/home");
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
