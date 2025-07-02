import { Redirect, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { isSignedIn , isLoaded} = useAuth();
  if(!isLoaded){
    return <ActivityIndicator />;
  }
  if(!isSignedIn){
    return <Redirect href="/sign-in" />
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
