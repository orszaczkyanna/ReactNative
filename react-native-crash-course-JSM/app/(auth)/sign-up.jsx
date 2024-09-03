import { useState } from "react";
import { Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    createUser("janedoe@email.com", "ExamplePass123", "Jane Doe");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 my-6 w-full min-h-[85vh] justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-2xl font-psemibold mt-10">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-secondary text-lg font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
