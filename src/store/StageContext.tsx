import { useContext, createContext, useState, useEffect, useMemo } from "react";

export type Stage =
  | "not-started"
  | "started"
  | "high-score-complete"
  | "high-score-smashed"
  | "high-score-baseline";

export type StageState = {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  stage: Stage;
  setStage: (stage: Stage) => void;
};

const StageContext = createContext<StageState>({
  isStarted: false,
  setIsStarted: () => {},
  stage: "not-started" as Stage,
  setStage: () => {},
});

export type StageContextProviderProps = {
  children: React.ReactNode;
};

export const StageContextProvider = ({
  children,
}: StageContextProviderProps) => {
  const [isStarted, setIsStarted] = useState(true);
  const [stage, setStage] = useState<Stage>("not-started");

  useEffect(() => {
    const keyDownHandler = () => {
      setIsStarted(true);
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isStarted,
      setIsStarted,
      stage,
      setStage,
    }),
    [isStarted, setIsStarted, stage, setStage],
  );

  return (
    <StageContext.Provider value={contextValue}>
      {children}
    </StageContext.Provider>
  );
};

export const useStageContext = () => {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error(
      "useStageContext must be used within <StageContextProvider />",
    );
  }

  return context;
};
