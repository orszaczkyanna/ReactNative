import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  handlePress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`${isLoading ? "opacity-50" : ""}
      ${containerStyles} bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
      disabled={isLoading}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text className={`${textStyles} text-primary text-lg font-psemibold`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
