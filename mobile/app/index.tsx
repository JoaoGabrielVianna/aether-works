import { Text, View } from "react-native";
import SignUpScreen from "./(auth)/signUp";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/contexts/auth/authContext";

export default function Index() {
  const { isSignedIn } = useAuth();


  if (isSignedIn){
    return <Redirect href={"/home"}/>
  }


  return <Redirect href="/(auth)/signIn" />;
}
