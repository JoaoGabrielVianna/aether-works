import { useState } from "react";
import { useAuth } from "@/contexts/auth/authContext";

export function useSignUpForm() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      // redirecionamento pode ocorrer dentro do signUp
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
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
    handleSignUp,
  };
}
