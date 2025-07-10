import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const supabase = useSupabase();

  // Fetch user's books count
  const { data: userBooks } = useQuery({
    queryKey: ['my-books'],
    queryFn: async () =>
      supabase.from('user-books').select('*', { count: 'exact' }).eq('user_id', user?.id),
  });

  return (
    <SafeAreaView className="flex-1 bg-[#010D1A]">
      <ScrollView className="flex-1 p-4">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full bg-gray-800 mb-4 overflow-hidden">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <MaterialIcons name="person" size={64} color="white" />
              </View>
            )}
          </View>
          <Text className="text-2xl font-bold text-white mb-1">
            {user?.fullName || 'AudioVerse User'}
          </Text>
          <Text className="text-gray-400">{user?.emailAddresses[0].emailAddress}</Text>
        </View>

        {/* Stats */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-white mb-4">Library Stats</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">{userBooks?.count || 0}</Text>
              <Text className="text-gray-400">Books</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">0</Text>
              <Text className="text-gray-400">In Progress</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">0</Text>
              <Text className="text-gray-400">Completed</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View className="bg-gray-800 rounded-xl overflow-hidden mb-6">
          <Text className="text-lg font-semibold text-white p-4">Account Settings</Text>
          <View className="border-t border-gray-700">
            <TouchableOpacity 
              className="flex-row items-center justify-between p-4"
              onPress={() => router.push('/edit-profile')}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="person-outline" size={24} color="white" className="mr-3" />
                <Text className="text-white ml-3">Edit Profile</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-t border-gray-700">
              <View className="flex-row items-center">
                <MaterialIcons name="notifications-none" size={24} color="white" />
                <Text className="text-white ml-3">Notifications</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-t border-gray-700">
              <View className="flex-row items-center">
                <MaterialIcons name="security" size={24} color="white" />
                <Text className="text-white ml-3">Privacy & Security</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={() => signOut()}
          className="bg-red-600 p-4 rounded-xl"
        >
          <Text className="text-white text-center font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}