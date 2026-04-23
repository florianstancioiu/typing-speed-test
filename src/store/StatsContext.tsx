import { useContext, createContext, useState, useReducer } from "react";
import { type Dispatch } from "react";

import {
  initialStats,
  statsReducer,
  type StatsReducerAction,
  type Stats,
} from "../reducers/statsReducer";

export type StatsState = {
  wpm: number;
  setWpm: (wpm: number) => void;
  accuracy: number;
  setAccuracy: (accuracy: number) => void;
  time: number;
  setTime: (time: number) => void;
  stats: Stats;
  dispatchStats: Dispatch<StatsReducerAction>;
};

const StatsContext = createContext<StatsState>({
  wpm: 0,
  setWpm: (_wpm: number) => {},
  accuracy: 0,
  setAccuracy: (_accuracy: number) => {},
  time: 60,
  setTime: (_time: number) => {},
  stats: initialStats,
  dispatchStats: () => {},
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
  const [stats, dispatchStats] = useReducer(statsReducer, initialStats);

  return (
    <StatsContext.Provider
      value={{
        wpm,
        setWpm,
        accuracy,
        setAccuracy,
        time,
        setTime,
        stats,
        dispatchStats,
      }}
    >
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
