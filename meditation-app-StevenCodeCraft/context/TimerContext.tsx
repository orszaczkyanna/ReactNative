import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface TimerContextType {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>; // Azt is tudja kezelni, amikor függvényt kap, ami számértéket ad vissza, pl. setCount(prevCount => prevCount + 1)

  // Dispatch: függvény, ami új értéket ad az állapotnak (state-nek)
  // <SetStateAction<>>: új érték, vagy egy olyan függvény, ami kiszámítja az új értéket
  // <number> az új érték szám legyen, vagy számértéket visszaadó függvény
}

export const TimerContext = createContext<TimerContextType>({
  duration: 10, // Biztonsági alapértelmezett érték, ha nincs Provider
  setDuration: () => {},
});

interface TimerProviderProps {
  children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(10); // Tényleges kezdőérték
  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
