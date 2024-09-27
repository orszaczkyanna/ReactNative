/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
    "./app/(tabs)/meditate.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        // rmono: ["Roboto-Mono", "sans-serif"],
        rmono: ["Roboto-Mono"],
        // React Native does not support fallback fonts. If an array of fonts are provided, NativeWind will only use the first font.
      },
    },
  },
  plugins: [],
};
