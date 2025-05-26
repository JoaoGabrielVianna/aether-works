import { useAuth } from "@/contexts/auth/authContext";
import { Redirect, Tabs } from "expo-router";
import { View, Platform } from 'react-native';
import { COLORS } from '@/constants/colors';
import {
  Activity,
  Settings,

} from 'lucide-react-native';
import { HomeIcon } from "@/components/homeIcon";
import { SettingsIcon } from "@/components/settingsIcon";

// Componente para ícones da tab bar
interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}


export default function Layout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/signIn"} />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          paddingHorizontal: 8,
          elevation: 8,
          shadowColor: COLORS.shadow,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Sensores",
          tabBarIcon: (props) => <HomeIcon {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Config",
          tabBarIcon: (props) => <SettingsIcon {...props} />,
        }}
      />
    </Tabs>
  );
}