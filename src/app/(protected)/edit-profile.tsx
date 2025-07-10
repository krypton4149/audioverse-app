import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function EditProfile() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        setLoading(true);
        // Convert image to blob
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        await user?.setProfileImage({ file: blob });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#010D1A]">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2"
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white ml-2">Edit Profile</Text>
        </View>

        {/* Profile Photo */}
        <View className="items-center mb-8">
          <TouchableOpacity
            onPress={pickImage}
            className="relative"
            disabled={loading}
          >
            <View className="w-32 h-32 rounded-full bg-gray-800 overflow-hidden">
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
            <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full">
              <MaterialIcons name="camera-alt" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-gray-400 mt-2">Tap to change profile photo</Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">First Name</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">Last Name</Text>
            <TextInput
              className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            onPress={saveProfile}
            disabled={loading}
            className="bg-blue-600 p-4 rounded-xl mt-4"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold">Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 