import { useContext, createContext, useState, useMemo } from "react";
import { initialStats } from "../reducers/statsReducer";

export type StatsState = {
  wpm: number;
  setWpm: (wpm: number) => void;
  accuracy: number;
  setAccuracy: (accuracy: number) => void;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

const StatsContext = createContext<StatsState>({
  wpm: 0,
  setWpm: (_wpm: number) => {},
  accuracy: 0,
  setAccuracy: (_accuracy: number) => {},
  time: 60,
  setTime: () => {},
});

export type StatsContextProviderProps = {
  children: React.ReactNode;
};

export const StatsContextProvider = ({
  children,
}: StatsContextProviderProps) => {
  const [wpm, setWpm] = useState(initialStats.wpm);
  const [accuracy, setAccuracy] = useState(initialStats.accuracy);
  const [time, setTime] = useState(60);

  const contextValue = useMemo(
    () => ({
      wpm,
      setWpm,
      accuracy,
      setAccuracy,
      time,
      setTime,
    }),
    [wpm, setWpm, accuracy, setAccuracy, time, setTime],
  );

  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStatsContext = () => {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error(
      "useStatsContext must be used within <StatsContextProvider />",
    );
  }

  return context;
};
