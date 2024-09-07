import { View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({ value, handleChangeText, otherStyles, ...props }) => {
  return (
    <View
      className={
        "bg-black-100 border-2 border-black-200 w-full h-16 px-4 rounded-2xl items-center flex-row space-x-4 focus:border-secondary"
      }
    >
      <TextInput
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        className="flex-1 text-white text-base font-pregular mt-0.5"
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
