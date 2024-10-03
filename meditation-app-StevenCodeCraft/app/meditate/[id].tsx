import { useEffect, useState } from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";

import AntDesign from "@expo/vector-icons/AntDesign";
import MEDITATION_IMAGES from "@/constants/meditation-images"; //naming conventions for constants
import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";

import { useTimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams(); // string

  const { duration: secondsRemaining, setDuration: setSecondsRemaining } =
    useTimerContext(); // useContext(TimerContext);
  // const [secondsRemaining, setSecondsRemaining] = useState<number>(10);

  const [isMeditating, setMeditating] = useState<boolean>(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState<boolean>(false);

  // ---- useEffect Timeout ----
  useEffect(() => {
    let timerID: NodeJS.Timeout; //setTimeout

    // Exit useEffect when we reach 0
    if (secondsRemaining === 0) {
      setMeditating(false);
      if (isPlayingAudio) audioSound?.pauseAsync();
      setPlayingAudio(false);
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

  // ---- useEffect Unload Audio Sound ----
  useEffect(() => {
    // the component unmounts when we press the back button (router.back())
    // a cleanup function nem támogatja az aszinkron műveleteket, ezért nem használható az await
    return () => {
      audioSound?.unloadAsync(); // teljesen eltávolítja a hang fájlt a memóriából

      setSecondsRemaining(10); // unmountolásnál álljon vissza 10 másodpercre
    };
  }, [audioSound]);

  // ---- function: Toggle Meditation Start/Stop with Sound Play/Pause ----
  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setMeditating(!isMeditating);

    await toggleSound();
  };

  // ---- function: Toggle Sound Play/Pause (Hang elindítása és leállítása) ----
  const toggleSound = async () => {
    // Ha már van betöltött hang, akkor azt használjuk, egyébként inicializáljuk a hangot
    const sound = audioSound ? audioSound : await initializeSound();

    // Ellenőrizzük a hang státuszát (pl. betöltött-e)
    const status = await sound?.getStatusAsync();

    // Ha a hang betöltött és még nem megy a lejátszás
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync(); // indítsuk el a lejátszást
      setPlayingAudio(true);
      // másképp
    } else {
      await sound.pauseAsync(); // állítsuk meg a lejátszást
      setPlayingAudio(false);
    }
  };

  // ---- function: Usage of Audio.Sound from axpo-av ----
  const initializeSound = async () => {
    // A megfelelő meditációs hangfájl neve az { id } alapján
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    // A hang betöltése lokális fájlból az expo-av Audio.Sound.createAsync() aszinkron függvény segítségével
    //  const { sound } = await Audio.Sound.createAsync( require('./assets/example.mp3') );
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    // A betöltött hang tárolása az állapotban
    setAudioSound(sound);

    // A hang visszaadása további használatra
    return sound;
  };

  // ---- Variables for time left ----
  // Format the time left to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  // ---- Function for Handle Adjust Duration Modal ----
  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/adjust-meditation-duration");
  };

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
              title="Adjust duration"
              onPress={handleAdjustDuration} // reference to the function
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
