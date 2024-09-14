import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { createVideo } from "../../lib/appwrite";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const { user } = useGlobalContext();

  const openPicker = async (selectType) => {
    // // ----- ImagePicker version -----
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes:
    //     selectType === "image"
    //       ? ImagePicker.MediaTypeOptions.Images
    //       : ImagePicker.MediaTypeOptions.Videos,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // ----- DocumentPicker version -----
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled && result.assets.length > 0) {
      switch (selectType) {
        case "image":
          setForm({ ...form, thumbnail: result.assets[0] });
          // assets[0], mert az expo-document-picker az assets tömböt használja a kiválasztott fájl adataihoz
          break;
        case "video":
          setForm({ ...form, video: result.assets[0] });
          break;
        default:
          console.log(`Unexpected type: ${selectType}`);
          break;
      }
      // Alert.alert("Document picked", JSON.stringify(result, null, 2));
      // console.log(result);
    }
    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert("Please fill in all the fields");
      // A return megakadályozza, hogy a kód a figyelmeztetés után tovább fusson
    }

    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Uploaded successfully");
      router.push("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>

        {/* Title */}
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        {/* Video */}
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center border-black-200 border-2">
                <View className="border-secondary-100 border border-dashed w-14 h-14 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Thumbnail */}
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-black-200 border-2 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-gray-100 text-sm font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Prompt */}
        <FormField
          title="Video Title"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        {/* Upload Button */}
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
