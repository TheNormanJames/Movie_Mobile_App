import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/MovieCard';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500); // Debounce for 500ms
    return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount or when searchQuery changes
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              ></SearchBar>
            </View>
            {loading && (
              <ActivityIndicator
                size={'large'}
                color={'#00f'}
                className="mt-3"
              ></ActivityIndicator>
            )}
            {error && (
              <Text className="text-red-500 px-5 mt-3">
                Error: {error?.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Result for{' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View>
            {!loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? 'No Movies found'
                    : 'Search for a movie'}
                </Text>
              </View>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
