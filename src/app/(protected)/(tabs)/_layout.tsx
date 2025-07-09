import {  Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {BottomTabBar} from '@react-navigation/bottom-tabs'
import FloatingPlayer from "@/components/FloatingPlayer";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) =>(
      <>
      <FloatingPlayer />  
      <BottomTabBar {...props} />
      </>
    )}
    >
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
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
