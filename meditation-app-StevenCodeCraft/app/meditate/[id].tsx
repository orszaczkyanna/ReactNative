import { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import MEDITATION_IMAGES from "@/constants/meditation-images"; //naming conventions for constants
import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";

const Meditate = () => {
  const { id } = useLocalSearchParams(); // string

  const [secondsRemaining, setSecondsRemaining] = useState<number>(10);
  const [isMeditating, setMeditating] = useState<boolean>(false);

  // ---- useEffect Timeout ----
  useEffect(() => {
    let timerID: NodeJS.Timeout; //setTimeout

    // Exit useEffect when we reach 0
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }

    // Start Meditation gomb megnyomása után induljon
    if (isMeditating) {
      timerID = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }

    // useEffect Cleanup function (when unmount)
    return () => {
      clearTimeout(timerID);
    };
  }, [secondsRemaining, isMeditating]);

  // ---- Variables for time left ----
  // Format the time left to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable
            onPress={router.back}
            className="absolute left-6 top-16 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          {/* Meditation Duration */}
          <View className="flex-1 justify-center">
            <View className=" mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="mb-5">
            <CustomButton
              title="Start Meditation"
              onPress={() => setMeditating(true)}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
