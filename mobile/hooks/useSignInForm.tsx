import { useState } from "react";
import { useAuth } from "@/contexts/auth/authContext";

export function useSignInForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError("");
    if (!email || !password) {
      setError("Preencha email e senha");
      setIsLoading(false);
      return;
    }
    try {
      await signIn(email, password);
      // redirecionamento ocorre no signIn via router
    } catch {
      setError("Erro no login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSignIn,
  };
}
