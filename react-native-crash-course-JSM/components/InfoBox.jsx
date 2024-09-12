import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, titleStyles, containerStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`${titleStyles} text-white text-center font-psemibold`}>
        {title}
      </Text>
      <Text className="text-gray-100 text-sm text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
