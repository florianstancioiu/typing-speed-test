import { useContext, createContext, useState } from "react";
import { type DropdownOption } from "../components/UI/DropdownToButtons/DropdownToButtons";
import data from "../data.json";

export type DifficultyOption = {
  id: number;
  title: string;
  value: string;
  isActive: boolean;
};

export type TypingState = {
  textToType: string | undefined;
  difficultyOptions: DropdownOption[];
  onDifficultyOptionClickHandler: (option: DropdownOption) => void;
  modeOptions: DropdownOption[];
  onModeOptionClickHandler: (option: DropdownOption) => void;
};

const DifficultyAndModeContext = createContext<TypingState>({
  textToType: undefined,
  difficultyOptions: [],
  onDifficultyOptionClickHandler: () => {},
  modeOptions: [],
  onModeOptionClickHandler: () => {},
});

export type DifficultyAndModeContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Re-Read useContext documentation to optimize for re-renders
export const DifficultyAndModeContextProvider = ({
  children,
}: DifficultyAndModeContextProviderProps) => {
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
  const [textToType, setTextToType] = useState(data.medium[0].text);
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

  // setTextToTypeBasedOnDifficulty(difficultyOptions);

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
    <DifficultyAndModeContext.Provider
      value={{
        textToType,
        difficultyOptions,
        onDifficultyOptionClickHandler,
        modeOptions,
        onModeOptionClickHandler,
      }}
    >
      {children}
    </DifficultyAndModeContext.Provider>
  );
};

export const useDifficultyAndModeContext = () => {
  const context = useContext(DifficultyAndModeContext);

  if (!context) {
    throw new Error(
      "useDifficultyAndModeContext must be used within <DifficultyAndModeContext />",
    );
  }

  return context;
};
