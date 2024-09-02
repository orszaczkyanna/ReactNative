import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props // keyboardType
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-gray-100 font-pmedium text-base">{title}</Text>

      <View
        className={
          "bg-black-100 border-2 border-black-200 w-full h-16 px-4 rounded-2xl items-center flex-row focus:border-secondary"
        }
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          className="flex-1 text-white text-base font-psemibold"
          //   keyboardType={props.keyboardType}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
