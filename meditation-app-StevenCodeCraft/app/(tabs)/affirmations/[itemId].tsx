import { useEffect, useState } from "react";
import {
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { GalleryPreviewData } from "@/constants/model/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams(); // string
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data;
      const affirmationToStart = affirmationsData.find(
        (a) => a.id === Number(itemId)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        const affirmationsArray = affirmationToStart.text.split(".");

        // Remove last element if it's an empty string
        if (affirmationsArray[affirmationsArray.length - 1] === "") {
          affirmationsArray.pop();
        }

        // console.log(affirmationsArray.length);
        setSentences(affirmationsArray);

        return;
      }
    }
  }, []);

  return (
    <ImageBackground
      source={affirmation?.image}
      resizeMode="cover"
      className="flex-1"
    >
      <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
        {/* <Pressable onPress={() => router.back()}> */}
        <Pressable onPress={router.back} className="absolute top-16 left-6">
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>

        <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
          <View className="h-full justify-center">
            <View className="h-4/5 justify-center">
              {/* a szülő elem magasságának 4/5-ét (azaz 80%-át) veszi fel az elem */}
              {sentences.map((sentence, idx) => (
                <Text
                  key={idx} //index
                  className="text-white text-3xl mb-12 font-bold text-center"
                >
                  {sentence}.
                </Text>
              ))}
              {/* <Text>{affirmation?.text}</Text> */}
            </View>
          </View>
        </ScrollView>
      </AppGradient>
    </ImageBackground>
  );
};

export default AffirmationPractice;
