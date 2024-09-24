import { Tabs } from "expo-router";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import Entypo from "@expo/vector-icons/Entypo";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="nature-meditate" // a nature-meditate.tsx-hez visz
        options={{
          // title: "Nature Meditation", // a képernyő tetején a headerben jelenik meg (ha headerShown: true)
          tabBarLabel: "Meditate", // a tab navigációs sávban, az ikonnál jelenik meg
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="affirmations"
        options={{
          tabBarLabel: "Affirmations",
          tabBarIcon: ({ color }) => (
            <Entypo name="open-book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
