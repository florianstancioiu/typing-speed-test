import { useContext, createContext, useState } from "react";
import { type DropdownOption } from "../components/UI/DropdownToButtons/DropdownToButtons";

export type ModeState = {
  modeOptions: DropdownOption[];
  onModeOptionClickHandler: (option: DropdownOption) => void;
};

const ModeContext = createContext<ModeState>({
  modeOptions: [],
  onModeOptionClickHandler: () => {},
});

export type ModeContextProviderProps = {
  children: React.ReactNode;
};

export const ModeContextProvider = ({ children }: ModeContextProviderProps) => {
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
    <ModeContext.Provider
      value={{
        modeOptions,
        onModeOptionClickHandler,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error(
      "useModeContext must be used within <ModeContextProvider />",
    );
  }

  return context;
};
