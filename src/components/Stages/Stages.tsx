import StageNotStarted from "../StageNotStarted/StageNotStarted";
import StageStarted from "../StageStarted/StageStarted";

export type PageState =
  | "not-started"
  | "started"
  | "high-score-complete"
  | "high-score-smashed"
  | "high-score-baseline";

export type StagesProps = {
  currentStage: PageState;
};

const Stages = ({ currentStage }: StagesProps) => {
  switch (currentStage) {
    case "not-started":
      return <StageNotStarted />;
    case "started":
      return <StageStarted />;
  }
};

export default Stages;
