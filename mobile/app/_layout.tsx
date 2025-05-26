import SafeScreen from "@/components/safeScreen";
import { AuthProvider } from "@/contexts/auth/authContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Slot/>
      </SafeScreen>
    </AuthProvider>
  );
}
