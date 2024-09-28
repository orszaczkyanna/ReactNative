// Ha más fájlban nem használom, nem kell az export
// export interface MeditationType {
interface MeditationType {
  id: number;
  title: string;
  image: string; // image name
  audio: string; // audio name
}

export const MEDITATION_DATA: MeditationType[] = [
  {
    id: 1,
    title: "Mountains",
    image: "trees.webp",
    audio: "trees.mp3",
  },
  {
    id: 2,
    title: "Rivers",
    image: "river.webp",
    audio: "river.mp3",
  },
  {
    id: 3,
    title: "Sunset",
    image: "meditate-under-tree.webp",
    audio: "meditate-under-tree.mp3",
  },
  {
    id: 4,
    title: "Beaches",
    image: "beach.webp",
    audio: "beach.mp3",
  },
  {
    id: 5,
    title: "Starry Night",
    image: "yosemite-stars.webp",
    audio: "yosemite-stars.mp3",
  },
  {
    id: 6,
    title: "Waterfall",
    image: "waterfall.webp",
    audio: "waterfall.mp3",
  },
];

// interface AudioType {
//   // a kulcsok stringek, az értékek pedig bármilyen típusúak lehetnek
//   // [] index signature: az objektum dinamikusan jöhet létre, és a kulcsok nem előre meghatározottak, hanem bármilyen string lehet kulcs
//   // tehát bármi lehet a kulcs, ami egy string
//   [key: string]: any;
// }

// export const AUDIO_FILES: AudioType = {
//   "trees.mp3": require("@/assets/audio/trees.mp3"),
//   "river.mp3": require("@/assets/audio/river.mp3"),
//   "meditate-under-tree.mp3": require("@/assets/audio/meditate-under-tree.mp3"),
//   "beach.mp3": require("@/assets/audio/beach.mp3"),
//   "yosemite-stars.mp3": require("@/assets/audio/yosemite-stars.mp3"),
//   "waterfall.mp3": require("@/assets/audio/waterfall.mp3"),
// };

export const AUDIO_FILES: { [key: string]: any } = {
  "trees.mp3": require("@/assets/audio/trees.mp3"),
  "river.mp3": require("@/assets/audio/river.mp3"),
  "meditate-under-tree.mp3": require("@/assets/audio/meditate-under-tree.mp3"),
  "beach.mp3": require("@/assets/audio/beach.mp3"),
  "yosemite-stars.mp3": require("@/assets/audio/yosemite-stars.mp3"),
  "waterfall.mp3": require("@/assets/audio/waterfall.mp3"),
};
