// pages/(auth)/signIn.tsx
import { Link } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { useSignInForm } from "@/hooks/useSignInForm";


export default function SignInScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSignIn,
  } = useSignInForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email..."
        placeholderTextColor={COLORS.placeholder}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password..."
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Link href="/(auth)/signUp" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}> Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.text,
  },
  linkText: {
    color: COLORS.link,
    fontWeight: "bold",
  },
  error: {
    color: COLORS.error,
    marginBottom: 12,
    textAlign: "center",
  },
});
