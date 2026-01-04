import { useContext, createContext, useState } from "react";

export type Stage =
  | "not-started"
  | "started"
  | "high-score-complete"
  | "high-score-smashed"
  | "high-score-baseline";

const initialData = {
  stage: "not-started" as Stage,
  setStage: () => {},
};

const StageContext = createContext<{
  stage: Stage;
  setStage: (page: Stage) => void;
}>(initialData);

export type StageContextProviderProps = {
  children: React.ReactNode;
};

export const StageContextProvider = ({
  children,
}: StageContextProviderProps) => {
  const [stage, setStage] = useState<Stage>("not-started");

  return (
    <StageContext.Provider
      value={{
        stage,
        setStage,
      }}
    >
      {children}
    </StageContext.Provider>
  );
};

export const useStageContext = () => {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error(
      "useStageContext must be used within <StageContextProvider />"
    );
  }

  return context;
};
