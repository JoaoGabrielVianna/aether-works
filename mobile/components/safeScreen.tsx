import { StyleSheet, Text } from "react-native";
import { View } from "react-native"
import { ReactNode } from "react";
import { COLORS } from "@/constants/colors";

interface SafeScreenProps {
    children: ReactNode;
}



const SafeScreen = ({ children }: SafeScreenProps) => {
    return (
        <View style={SafeScreenStyles.container}>
            {children}
        </View>
    )
}

export default SafeScreen;


const SafeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 50,

    }
})