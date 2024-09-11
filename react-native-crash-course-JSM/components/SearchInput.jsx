import { useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { usePathname, router } from "expo-router";
import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  // pathname: az aktuális útvonalat adja vissza, az URL-t, ahol jelenleg tartózkodik az alkalmazás
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className={
        "bg-black-100 border-2 border-black-200 w-full h-16 px-4 rounded-2xl items-center flex-row space-x-4 focus:border-secondary"
      }
    >
      <TextInput
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)} // !Note: 'e' is the entered text string, not an event object
        className="flex-1 text-white text-base font-pregular mt-0.5"
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
            // Ha már a keresési oldalon vagyunk, a router nem vált át egy új oldalra, hanem egyszerűen frissíti a keresési paramétereket
          } else {
            router.push(`/search/${query}`);
            // Ha nem vagyunk a keresési oldalon, a router az új útvonalra navigál, ami a megadott keresési kifejezés (például /search/cats) lesz.
          }
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
