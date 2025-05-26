import { useAuth } from "@/contexts/auth/authContext";
import { Redirect, Stack } from "expo-router"

export default function AuthRRoutesLayout(){
    const {isSignedIn} = useAuth();

    if (isSignedIn){
        return <Redirect href={'/'}/>
    }

    return <Stack  screenOptions={{headerShown: false}}/>
}