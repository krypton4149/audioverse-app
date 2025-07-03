import { View, Text, Pressable } from "react-native";
import { Entypo} from "@expo/vector-icons";
import { router } from "expo-router";

export default function Player() {
   
    return (
        <View className="flex-1 items-center justify-center bg-gray-900">
            <Pressable 
            onPress={() => router.back()}
            className="bg-gray-800 p-2 rounded-full left-4 top-16 absolute">
                <Entypo name="chevron-down" size={24} color="white" />
       
            </Pressable>
            <Text>Player</Text>
        </View>
    );
}