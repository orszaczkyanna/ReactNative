import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut} // Az "activeItem"-mel megegyező id-jú elem legyen nagyobb, a többi kisebb
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 bg-white/10 mt-3 rounded-[35px]"
          resizeMode={ResizeMode.CONTAIN} // megtartja az arányokat, és betölti a videót anélkül, hogy levágna belőle
          useNativeControls // megjeleníti a natív videólejátszó vezérlőket (play, pause, volume stb.)
          shouldPlay // automatikusan elindítja a videó lejátszását, amint a komponens betöltődik
          onPlaybackStatusUpdate={(status) => {
            // a videó lejátszásának állapotát figyeli (pl. leállt, elindult, véget ért stb.)
            if (status.didJustFinish) {
              setPlay(false); // ha a videó végetért újra a thumbnail kép jelenjen meg
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72 rounded-[33px] overflow-hidden my-5 shadow-lg shadow-black40"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]); // kezdetben a 2. elem "aktív"

  const viewableItemsChanged = ({ viewableItems }) => {
    // viewableItems: a FlatList által biztosított automatikus tömb, amely tartalmazza a jelenleg látható elemeket (a viewabilityConfig alapján)

    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key); // key = $id (a keyExtractor-nak köszönthetően)
      // viewableItems[0].key: a legelső láthatónak minősülő elem kulcsa az aktuálisan megjelenített listában, a viewabilityConfig alapján (tehát itt az első, amelyikből minimum 70% látszik)
    }
  };

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged} // az onViewableItemsChanged prop biztosítja, hogy a megadott callback fusson le, amikor a FlatList-ben a látható elemek változnak (vagyis amikor görgetjük a listát)
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }} // az elemnek legalább 70%-ban láthatónak kell lennie ahhoz, hogy láthatónak minősüljön
        contentOffset={{ x: 170 }} // kezdeti eltolás 170 pixellel
        horizontal
      />
    </View>
  );
};

export default Trending;
