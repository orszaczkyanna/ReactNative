import { View, Text, FlatList, Pressable, Image } from "react-native";
import { GalleryPreviewData } from "@/constants/model/AffirmationCategory";
import { Link } from "expo-router";

interface GuidedAffirmationsGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}

// interface GalleryPreviewData {
//   id: number;
//   text: string;
//   image: any;
// }

const GuidedAffirmationsGallery = ({
  title,
  previews,
}: GuidedAffirmationsGalleryProps) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
        {/* title e.g. Positivity */}
      </View>

      {/* 1db Vízszintes FlatList */}
      <View className="space-y-2">
        <FlatList
          data={previews} // id, text, image
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            // @ts-ignore
            <Link href={`/affirmations/${item.id}`} asChild>
              {/* Usually text */}
              {/* More complex or already pressable child component => asChild prop */}
              <Pressable>
                <View className="h-36 w-32 rounded-md overflow-hidden mr-4">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
