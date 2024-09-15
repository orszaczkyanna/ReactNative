import { useState, useEffect } from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "../constants";

import { savePost, removeSavedPost, getSavedPosts } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useSavedVideosContext } from "../context/SavedVideosContextProvider";

const SaveButton = ({ video$id, title }) => {
  const { user } = useGlobalContext();
  const { savedVideos, refreshSavedVideos } = useSavedVideosContext();

  const isSaved = savedVideos.some((video) => video.$id === video$id);
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    setIsSaving(true);
    // console.log(`user.$id: ${user.$id} video.$id: ${video$id}`);
    try {
      if (!isSaved) {
        await savePost(user.$id, video$id);
        console.log(`Saved video: ${title} ${video$id}`);
      } else {
        await removeSavedPost(user.$id, video$id);
        console.log(`Removed video: ${title} ${video$id}`);
      }
      refreshSavedVideos();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={save}
      className={isSaving ? "opacity-50" : ""}
      disabled={isSaving}
      activeOpacity={0.7}
    >
      <Image
        source={icons.bookmark}
        className="w-4 h-4"
        resizeMode="contain"
        tintColor={isSaved ? "#FF9C01" : "#CDCDE0"}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
