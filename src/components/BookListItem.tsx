import { Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { usePlayer } from '@/providers/PlayerProvider';
import { Book } from '@/types';

type BookListItemProps = {
  book: Book | null;
};

export default function BookListItem({ book }: BookListItemProps) {
  const { playBook } = usePlayer();

  if (!book) {
    return null;
  }

  return (
    <Pressable
      onPress={() => playBook(book)}
      className='flex-row gap-4 items-center'
    >
      <Image
        source={{ uri: book.thumbnail_url || 'https://via.placeholder.com/160' }}
        className='w-16 aspect-square rounded-md'
      />
      <View className='gap-1 flex-1'>
        <Text className='text-1xl text-gray-100 font-bold'>{book.title}</Text>
        <Text className='text-gray-400'>{book.author}</Text>
      </View>

      <AntDesign name='playcircleo' size={24} color='gainsboro' />
    </Pressable>
  );
}