import { TabBarIconProps } from "@/models/tabbar";
import { Activity } from "lucide-react-native";
import { View } from "react-native";

export function HomeIcon({ focused, color, size }: TabBarIconProps) {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}>
        <Activity
          size={size}
          color={color}
          strokeWidth={focused ? 2.5 : 2}
        />
        {focused && (
          <View style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: color,
            marginTop: 2,
          }} />
        )}
      </View>
    );
  }