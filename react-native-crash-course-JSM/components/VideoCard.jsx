import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

import { usePathname } from "expo-router";
import SaveButton from "./SaveButton";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video, // video URL-je
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  const pathname = usePathname();

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="flex-row flex-1 justify-center items-center">
          <View className="border border-secondary w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="text-white font-psemibold text-sm"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-gray-100 text-xs font-pregular"
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2 flex-row space-x-2 items-center">
          {pathname !== "/profile" && (
            <SaveButton video$id={$id} title={title} />
          )}
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {/* ----- Video ----- */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 mt-3 rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        //* ----- Thumbnail ----- *//
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
