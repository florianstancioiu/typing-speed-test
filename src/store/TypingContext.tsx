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

export type Stage =
  | "not-started"
  | "started"
  | "high-score-complete"
  | "high-score-smashed"
  | "high-score-baseline";

export type TypingState = {
  isStarted: boolean;
  wpm: number;
  accuracy: number;
  time: number;
  stats: Stats;
  dispatchStats: Dispatch<StatsReducerAction>;
  stage: Stage;
  setStage: (stage: Stage) => void;
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
  isStarted: false,
  wpm: 0,
  accuracy: 0,
  time: 60,
  stats: initialStats,
  dispatchStats: () => {},
  stage: "not-started" as Stage,
  setStage: () => {},
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

  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(0);
  const [stage, setStage] = useState<Stage>("not-started");
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

  const restartTest = (setNotStartedStage: boolean = false) => {
    setWpm(0);
    setAccuracy(0);
    setTime(60);
    setKeyPosition(0);
    setTextThatWasTyped("");

    if (setNotStartedStage) {
      setStage("not-started");
    }
  };

  const setTextToTypeBasedOnDifficulty = (
    difficultyOptions: DifficultyOption[]
  ) => {
    const currentDifficulty = difficultyOptions.find(
      (option) => option.isActive
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

  const countdown = () => {
    if (isStarted) {
      return;
    }

    intervalRef.current = setInterval(() => {
      if (keyPosition > 0) {
        setTime((val) => {
          if (val <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }

          return val - 1;
        });
      }

      if (keyPosition === textToType.length || time <= 0) {
        setStage("high-score-complete");
      }
    }, 1000);
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
        setStage("started");
        setIsStarted(true);
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

    countdown();
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
        isStarted,
        wpm,
        accuracy,
        time,
        stats,
        dispatchStats,
        stage,
        setStage,
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
      "useTypingContext must be used within <TypingContextProvider />"
    );
  }

  return context;
};
