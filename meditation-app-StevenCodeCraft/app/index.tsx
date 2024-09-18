import React from "react";
import { View, Text, ImageBackground } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";

const App = () => {
  const router = useRouter();

  return (
    <View>
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="h-full fex-1"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
          {/* <LinearGradient
            className="h-full flex-1"
            colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}
          > */}
          <SafeAreaView className="flex-1 px-1 justify-between">
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
                onPress={() => router.push("/nature-meditate")}
              />
            </View>
          </SafeAreaView>
          {/* </LinearGradient> */}
        </AppGradient>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default App;
