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
import { useSignUpForm } from "@/hooks/useSignUpForm";

export default function SignUpScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSignUp,
  } = useSignUpForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

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

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, isLoading && { opacity: 0.6 }]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/(auth)/signIn" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}> Sign In</Text>
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
