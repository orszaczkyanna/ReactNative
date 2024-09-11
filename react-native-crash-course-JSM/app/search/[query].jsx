import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams(); // Dinamikus paraméter, ami a [query].jsx fájl nevéből ered. Az Expo Router automatikusan kibontja az URL-ből érkező dinamikus paramétert.
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            {/* Query Text */}
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="font-psemibold text-2xl text-white">
                {query}
              </Text>
            </View>

            {/* Search Bar */}
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
