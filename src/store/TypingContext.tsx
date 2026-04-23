import {
  useContext,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { type Dispatch } from "react";

import {
  initialStats,
  statsReducer,
  type StatsReducerAction,
  type Stats,
} from "../reducers/statsReducer";

export type TypingState = {
  wpm: number;
  accuracy: number;
  time: number;
  stats: Stats;
  dispatchStats: Dispatch<StatsReducerAction>;
  restartTest: (setNotStartedStage?: boolean) => void;
  keyPosition: number;
  textThatWasTyped: string;
};

const TypingContext = createContext<TypingState>({
  wpm: 0,
  accuracy: 0,
  time: 60,
  stats: initialStats,
  dispatchStats: () => {},
  restartTest: () => {},
  keyPosition: 0,
  textThatWasTyped: "",
});

export type TypingContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Re-Read useContext documentation to optimize for re-renders
export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [keyPosition, setKeyPosition] = useState(0);
  const [textThatWasTyped, setTextThatWasTyped] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(60);
  const [stats, dispatchStats] = useReducer(statsReducer, initialStats);

  const restartTest = (_setNotStartedStage: boolean = false) => {
    setWpm(0);
    setAccuracy(0);
    setTime(60);
    setKeyPosition(0);
    setTextThatWasTyped("");
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const ignoredKeys = [
        "Shift",
        "Backspace",
        "CapsLock",
        "Tab",
        "Control",
        "Enter",
        "Alt",
        "NumLock",
      ];

      if (!ignoredKeys.includes(event.key)) {
        setKeyPosition((val) => val + 1);
        setTextThatWasTyped((val) => `${val}${event.key}`);
      }

      if (event.key === "Backspace") {
        setKeyPosition((val) => {
          if (val - 1 > 0) {
            return val - 1;
          }

          return 0;
        });
        setTextThatWasTyped((val) => {
          if (val.length === 0) {
            return "";
          }

          return val.substring(0, val.length - 1);
        });
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <TypingContext.Provider
      value={{
        wpm,
        accuracy,
        time,
        stats,
        dispatchStats,
        restartTest,
        keyPosition,
        textThatWasTyped,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTypingContext = () => {
  const context = useContext(TypingContext);

  if (!context) {
    throw new Error(
      "useTypingContext must be used within <TypingContextProvider />",
    );
  }

  return context;
};
