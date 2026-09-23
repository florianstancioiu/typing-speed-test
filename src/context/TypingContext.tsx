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
import { isGameOverStats } from "../helpers/stats";

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

export type GameOverStats = {
  wpm: number;
  accuracy: number;
  mode: number | string;
};

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
  gameOver: (stats: GameOverStats) => void;
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
  gameOver: () => {},
});

export type TypingContextProviderProps = {
  children: React.ReactNode;
};

export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [keyPosition, setKeyPosition] = useState(0);
  const [textThatWasTyped, setTextThatWasTyped] = useState("");
  const [time, setTime] = useState(60);
  const intervalRef = useRef<number | undefined>(undefined);
  const [isStarted, setIsStarted] = useState(false);
  const [stage, setStage] = useState<Stage>("not-started");
  const [textToType, setTextToType] = useState<string>(data.easy[0].text);
  const [difficultyOptions, setDifficultyOptions] = useState([
    {
      id: 1,
      title: "Easy",
      value: "easy",
      isActive: true,
    },
    {
      id: 2,
      title: "Medium",
      value: "medium",
      isActive: false,
    },
    {
      id: 3,
      title: "Hard",
      value: "hard",
      isActive: false,
    },
  ]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isStarted || stage !== "started") {
        return;
      }

      // daca timpul a ajuns la zero sau daca ai introdus destule caractere
      // arati stageul potrivit si inchei jocul
      // verifici daca e new best sau high score sau baseline
      if (time <= 0) {
        setStage("high-score-baseline");
      } else {
        // in caz contrar decrementezi timpul
        setTime((timeVal) => --timeVal);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isStarted, stage, time]);

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

      // don't allow users to register key presses before starting the test
      if (!isStarted) {
        return;
      }

      // don't allow users to register key presses after ending the test
      if (textThatWasTyped.length >= textToType.length) {
        return;
      }

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
  }, [textThatWasTyped, textToType, isStarted]);

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

  const gameOver = (stats: GameOverStats) => {
    const localPersonalBest = localStorage.getItem("personalBest:v1");
    const personalBest = localPersonalBest
      ? (JSON.parse(localPersonalBest) as GameOverStats)
      : null;

    // there is nothing stored in the localStorage
    // so display the baseline stage and store the stats in localStorage
    if (!isGameOverStats(personalBest)) {
      setStage("high-score-baseline");
      localStorage.setItem("personalBest:v1", JSON.stringify(stats));
    } else if (personalBest !== null) {
      // the wpm in the stats object is smaller or equal than the one in the localStorage
      if (stats.wpm <= personalBest.wpm) {
        // so only display the complete stage
        setStage("high-score-complete");
      } else {
        // the wpm in the stats object is bigger than the one in the localStorage
        // so display the smashed stage and store the stats object in localStorage
        setStage("high-score-smashed");
        localStorage.setItem("personalBest:v1", JSON.stringify(stats));
      }
    }
  };

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
      gameOver,
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
      gameOver,
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
