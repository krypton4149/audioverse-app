import { ActivityIndicator, FlatList, Text } from 'react-native';

import BookListItem from '@/components/BookListItem';
import FloatingPlayer from '@/components/FloatingPlayer';
import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase';

export default function App() {
  const supabase = useSupabase();

  const { data, error, isLoading } = useQuery({
    queryKey: ['my-books'],
    queryFn: async () =>
      supabase.from('user-books').select('*, book:books(*)').throwOnError(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Filter out items with null books
  const validBooks = data?.data?.filter(item => item.book) || [];

  return (
    <FlatList
      data={validBooks}
      contentContainerClassName='gap-4 p-2'
      renderItem={({ item }) => <BookListItem book={item.book} />}
    />
  );
}