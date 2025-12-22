import { useContext, createContext, useState, useReducer } from "react";
import { type Dispatch } from "react";
import { type ListOption } from "../components/SeparatedList/SeparatedList";
import { type DropdownOption } from "../components/UI/DropdownToButtons/DropdownToButtons";

export type Stats = {
  wpm: number;
  accuracy: number;
  charactersRight: number;
  charactersWrong: number;
};

export type StatsReducerAction = {
  type: "setWPM" | "setAccuracy" | "setCharactersRight" | "setCharactersWrong";
  payload: number;
};

export type TypingState = {
  stats: Stats;
  dispatchStats: Dispatch<StatsReducerAction>;
  dummyText: string | undefined;
  listOptions: ListOption[];
  difficultyOptions: DropdownOption[];
  modeOptions: DropdownOption[];
  onDifficultyOptionClickHandler: (option: DropdownOption) => void;
  onModeOptionClickHandler: (option: DropdownOption) => void;
};

const TypingContext = createContext<TypingState>({
  stats: {
    wpm: 85,
    accuracy: 90,
    charactersRight: 120,
    charactersWrong: 5,
  },
  dispatchStats: () => {},
  dummyText: undefined,
  listOptions: [],
  difficultyOptions: [],
  modeOptions: [],
  onDifficultyOptionClickHandler: () => {},
  onModeOptionClickHandler: () => {},
});

const statsReducer = (state: Stats, action: StatsReducerAction) => {
  switch (action.type) {
    case "setWPM":
      return { ...state, wpm: action.payload };
    case "setAccuracy":
      return { ...state, accuracy: action.payload };
    case "setCharactersRight":
      return { ...state, charactersRight: action.payload };
    case "setCharactersWrong":
      return { ...state, charactersWrong: action.payload };
  }
};

export type TypingContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Re-Read useContext documentation to optimize for re-renders
export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const dummyText = `The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn't as modern as we assume."`;

  const listOptions = [
    { id: 1, title: "WPM:", value: 0 },
    { id: 2, title: "Accuracy:", value: "100%" },
    { id: 3, title: "Time:", value: "0:60" },
  ];

  const [stats, dispatchStats] = useReducer(statsReducer, {
    wpm: 85,
    accuracy: 90,
    charactersRight: 120,
    charactersWrong: 5,
  });

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
      isActive: false,
    },
    {
      id: 3,
      title: "Hard",
      value: "hard",
      isActive: true,
    },
  ]);

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
        stats,
        dispatchStats,
        dummyText,
        listOptions,
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
      "useTypingContext must be used within TypingContextProvider"
    );
  }

  return context;
};
