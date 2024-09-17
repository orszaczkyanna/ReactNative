import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <View>
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="h-full fex-1"
      >
        <LinearGradient
          className="h-full flex-1"
          colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
        >
          <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
            <View>
              <Text className="text-white text-center font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-white text-center text-2xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton
                title="Get Started"
                onPress={() => {
                  console.log("tap");
                }}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default App;
