import {
  useContext,
  createContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { type Dispatch } from "react";
import { type DropdownOption } from "../components/UI/DropdownToButtons/DropdownToButtons";
import data from "../data.json";

import {
  initialStats,
  statsReducer,
  type StatsReducerAction,
  type Stats,
} from "../reducers/statsReducer";

export type DifficultyOption = {
  id: number;
  title: string;
  value: string;
  isActive: boolean;
};

export type TypingState = {
  wpm: number;
  accuracy: number;
  time: number;
  stats: Stats;
  dispatchStats: Dispatch<StatsReducerAction>;
  restartTest: (setNotStartedStage?: boolean) => void;
  keyPosition: number;
  textThatWasTyped: string;
  textToType: string | undefined;
  difficultyOptions: DropdownOption[];
  modeOptions: DropdownOption[];
  onDifficultyOptionClickHandler: (option: DropdownOption) => void;
  onModeOptionClickHandler: (option: DropdownOption) => void;
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
  textToType: undefined,
  difficultyOptions: [],
  modeOptions: [],
  onDifficultyOptionClickHandler: () => {},
  onModeOptionClickHandler: () => {},
});

export type TypingContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Re-Read useContext documentation to optimize for re-renders
export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [difficultyOptions, setDifficultyOptions] = useState([
    {
      id: 1,
      title: "Easy",
      value: "easy",
      isActive: false,
    },
    {
      id: 2,
      title: "Medium",
      value: "medium",
      isActive: true,
    },
    {
      id: 3,
      title: "Hard",
      value: "hard",
      isActive: false,
    },
  ]);
  const [keyPosition, setKeyPosition] = useState(0);
  const [textToType, setTextToType] = useState(data.medium[0].text);
  const [textThatWasTyped, setTextThatWasTyped] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(60);

  const [stats, dispatchStats] = useReducer(statsReducer, initialStats);

  const [modeOptions, setModeOptions] = useState([
    {
      id: 1,
      title: "Timed (60s)",
      value: "timed-60-seconds",
      isActive: true,
    },
    {
      id: 2,
      title: "Passage",
      value: "passage",
      isActive: false,
    },
  ]);

  const restartTest = (_setNotStartedStage: boolean = false) => {
    setWpm(0);
    setAccuracy(0);
    setTime(60);
    setKeyPosition(0);
    setTextThatWasTyped("");
  };

  const setTextToTypeBasedOnDifficulty = (
    difficultyOptions: DifficultyOption[],
  ) => {
    const currentDifficulty = difficultyOptions.find(
      (option) => option.isActive,
    );

    if (currentDifficulty) {
      const difficultyTextArray =
        data[currentDifficulty.value as keyof typeof data];
      const theText =
        difficultyTextArray[
          Math.floor(Math.random() * difficultyTextArray.length)
        ].text;

      restartTest(true);
      setTextToType(theText);
    }
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

    setTextToTypeBasedOnDifficulty(difficultyOptions);
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const onDifficultyOptionClickHandler = (option: DropdownOption) => {
    const newOptions = difficultyOptions
      .map((difficultyOption) => ({
        ...difficultyOption,
        isActive: false,
      }))
      .map((difficultyOption) => ({
        ...difficultyOption,
        isActive: difficultyOption.id === option.id,
      }));

    setDifficultyOptions(newOptions);
    setTextToTypeBasedOnDifficulty(newOptions);
  };

  const onModeOptionClickHandler = (option: DropdownOption) => {
    const newOptions = modeOptions
      .map((modeOption) => ({
        ...modeOption,
        isActive: false,
      }))
      .map((modeOption) => ({
        ...modeOption,
        isActive: modeOption.id === option.id,
      }));

    setModeOptions(newOptions);
  };

  return (
    <TypingContext.Provider
      value={{
        wpm,
        accuracy,
        time,
        stats,
        dispatchStats,
        restartTest,
        textToType,
        keyPosition,
        textThatWasTyped,
        difficultyOptions,
        onDifficultyOptionClickHandler,
        modeOptions,
        onModeOptionClickHandler,
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
