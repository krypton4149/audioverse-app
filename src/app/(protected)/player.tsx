import { View, Text, Pressable, Image } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import dummyBooks from "@/dummyBooks";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaybackBar from "@/components/PlaybackBar";
import { useAudioPlayer } from "expo-audio";

export default function PlayerScreen() {
  const book = dummyBooks[0];

  const player = useAudioPlayer(book.audio_url);
        
  return (
    <SafeAreaView className="flex-1 py-10 bg-gray-950 p-4 gap-4">
      <Pressable
        onPress={() => router.back()}
        className="bg-gray-800 p-2 rounded-full left-4 top-16 absolute"
      >
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>
      <Image
        source={{ uri: book.thumbnail_url }}
        className="w-[92%] aspect-square rounded-[30px] self-center"
        resizeMode="cover"
      />
      <View className="flex-1 justify-end gap-8">
        <Text className="text-white text-center text-2xl font-bold">
          {book.title}
        </Text>
        <Text className="text-gray-400 text-center text-sm">{book.author}</Text>

        <PlaybackBar value={0.5} />

        <View className="flex-row items-center justify-between ">
          <Ionicons name="play-skip-back" size={24} color="white" />
          <Ionicons name="play-back" size={24} color="white" />
          <Ionicons name="play" size={50} color="white" />
          <Ionicons name="play-forward" size={24} color="white" />
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}
