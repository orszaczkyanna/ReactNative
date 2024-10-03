import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// ---- 1. A Context által megosztott adatok típusának definiálása ----
interface TimerContextType {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>; // Azt is tudja kezelni, amikor függvényt kap, ami számértéket ad vissza, pl. setCount(prevCount => prevCount + 1)

  // Dispatch: függvény, ami új értéket ad az állapotnak (state-nek)
  // <SetStateAction<>>: új érték, vagy egy olyan függvény, ami kiszámítja az új értéket
  // <number> az új érték szám legyen, vagy számértéket visszaadó függvény
}

// // ---- 2. Context létrehozása alapértelmezett értékekkel ----
// export const TimerContext = createContext<TimerContextType>({
//   duration: 10, // Biztonsági alapértelmezett érték, arra az esetre ha nincs Provider
//   setDuration: () => {},
// });

// ---- 2. Context létrehozása ----
export const TimerContext = createContext<TimerContextType | undefined>(
  undefined
);

// ---- 3. Custom hook létrehozása a Context használatának egyszerűsítésére és ellenőrzésére ----
export const useTimerContext = () => {
  // return useContext(TimerContext);

  const context = useContext(TimerContext);
  // Ha a context lehet undefined, akkor kötelező ellenőrizni
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

// ---- 4. A Provider komponens definiálása, amely a Context értékeit biztosítja ----
const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [duration, setDuration] = useState(10); // Tényleges kezdőérték
  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
