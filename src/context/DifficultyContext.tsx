import {
  useContext,
  createContext,
  useState,
  useMemo,
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

export type DifficultyState = {
  textToType: string;
  difficultyOptions: DropdownOption[];
  onDifficultyOptionClickHandler: (option: DropdownOption) => void;
};

const DifficultyContext = createContext<DifficultyState>({
  textToType: "",
  difficultyOptions: [],
  onDifficultyOptionClickHandler: () => {},
});

export type DifficultyContextProviderProps = {
  children: React.ReactNode;
};

export const DifficultyContextProvider = ({
  children,
}: DifficultyContextProviderProps) => {
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

  const contextValue = useMemo(
    () => ({
      textToType,
      difficultyOptions,
      onDifficultyOptionClickHandler,
    }),
    [textToType, difficultyOptions, onDifficultyOptionClickHandler],
  );

  return (
    <DifficultyContext.Provider value={contextValue}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficultyContext = () => {
  const context = useContext(DifficultyContext);

  if (!context) {
    throw new Error(
      "useDifficultyContext must be used within <DifficultyContextProvider />",
    );
  }

  return context;
};
