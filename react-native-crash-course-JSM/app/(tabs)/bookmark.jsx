import { useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VideoCard from "../../components/VideoCard";

import useAppwrite from "../../lib/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getSavedPosts(user.$id));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // fetchData() <= getSavedPosts()
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={
          <View className="my-6 px-4">
            <Text className="text-white text-2xl font-psemibold">
              Saved Videos
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="my-6 px-4">
            <Text className="font-psemibold text-xl  text-white">
              No Videos Found
            </Text>
            <Text className="font-pmedium text-sm text-gray-100 mt-3">
              You haven't saved videos yet.
            </Text>
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default Bookmark;
