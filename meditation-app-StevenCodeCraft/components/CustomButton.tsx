import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string; // optional
  containerStyles?: string; // optional
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "", // default value ""
  containerStyles = "", // default value ""
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`${containerStyles} bg-white min-h-[62px] rounded-xl justify-center items-center`}
      onPress={onPress}
    >
      <Text className={`${textStyles} text-lg font-semibold`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
