import { View, Text, ScrollView } from "react-native";
import AppGradient from "@/components/AppGradient";

import GuidedAffirmationsGallery from "@/components/GuidedAffirmationsGallery";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";

const Affirmations = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs with affirmations
          </Text>

          {/* Horizontal ListS */}
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationsGallery
                key={g.title} // uniquely identifies affirmation category e.g. Positivity
                title={g.title} // e.g. Positivity
                previews={g.data} // id, text, image
              />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmations;
