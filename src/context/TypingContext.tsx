import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { type DropdownOption } from "../components/UI/DropdownToButtons/DropdownToButtons";
import data from "../data.json";

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
  keyPosition: number;
  textThatWasTyped: string;
  setTextThatWasTyped: React.Dispatch<React.SetStateAction<string>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  stage: Stage;
  setStage: (stage: Stage) => void;
  textToType: string;
  difficultyOptions: DropdownOption[];
  onDifficultyOptionClickHandler: (option: DropdownOption) => void;
};

const TypingContext = createContext<TypingState>({
  keyPosition: 0,
  textThatWasTyped: "",
  setTextThatWasTyped: () => {},
  time: 60,
  setTime: () => {},
  isStarted: false,
  setIsStarted: () => {},
  stage: "not-started" as Stage,
  setStage: () => {},
  textToType: "",
  difficultyOptions: [],
  onDifficultyOptionClickHandler: () => {},
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
  const [time, setTime] = useState(60);
  const intervalRef = useRef<number | undefined>(undefined);
  const [isStarted, setIsStarted] = useState(true);
  const [stage, setStage] = useState<Stage>("not-started");
  const [textToType, setTextToType] = useState<string>(data.medium[0].text);
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

      setTextToType(theText);
    }
  };

  const onDifficultyOptionClickHandler = useCallback(
    (option: DropdownOption) => {
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
    },
    [difficultyOptions],
  );

  useEffect(() => {
    const keyDownHandler = () => {
      setIsStarted(true);
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isStarted || stage !== "started") {
        return;
      }

      if (time === 0) {
        setStage("high-score-baseline");
      }

      if (time !== 0 && textThatWasTyped.length !== textToType.length) {
        setTime((val) => --val);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted, time, textThatWasTyped, textToType, setStage, setTime]);

  const contextValue = useMemo(
    () => ({
      keyPosition,
      textThatWasTyped,
      setTextThatWasTyped,
      time,
      setTime,
      isStarted,
      setIsStarted,
      stage,
      setStage,
      textToType,
      difficultyOptions,
      onDifficultyOptionClickHandler,
    }),
    [
      keyPosition,
      textThatWasTyped,
      setTextThatWasTyped,
      time,
      setTime,
      isStarted,
      setIsStarted,
      stage,
      setStage,
      textToType,
      difficultyOptions,
      onDifficultyOptionClickHandler,
    ],
  );

  return (
    <TypingContext.Provider value={contextValue}>
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
