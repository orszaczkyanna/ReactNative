import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

// This will prevent the Splash Screen from auto hiding until loading all the font assets
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });

  useEffect(() => {
    // // --- Based on Expo Documentation ---
    // if (fontsLoaded || error) {
    //   // akkor is elrejti a SplashScreen-t ha van hiba
    //   SplashScreen.hideAsync();
    // }

    // --- Based on Tutorial ---
    if (error) throw error; // korábban keletkezett, létező Error objektum
    if (fontsLoaded) SplashScreen.hideAsync(); // akkor rejti el a SplashScreent ha a fontok betöltődtek
  }, [fontsLoaded, error]);

  // --- Both ---
  if (!fontsLoaded && !error) {
    return null;
  }

  // --- Based on Tutorial ---
  if (!fontsLoaded) {
    // Ha a fontok nem töltődnek be, ne jelenjen meg semmi
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
