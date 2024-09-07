import { View, Text, Image } from "react-native";
import { router } from "expo-router";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="font-psemibold text-xl text-center text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}k</Text>
      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
