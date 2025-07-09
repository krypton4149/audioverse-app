import { Text, ActivityIndicator, FlatList } from 'react-native';
import { useSupabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import DiscoveryBookListItem from '@/components/DiscoveryBookListItem';

export default function Discover() {
  const supabase = useSupabase();

  const { data, error, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data } = await supabase.from('books').select('*');
      return data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data || []}
      contentContainerClassName='gap-4 p-2'
      renderItem={({ item }) => <DiscoveryBookListItem book={item} />}
    />
  );
}