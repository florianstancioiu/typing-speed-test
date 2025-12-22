import StageNotStarted from "../StageNotStarted/StageNotStarted";
import StageStarted from "../StageStarted/StageStarted";

export type PageState =
  | "not-started"
  | "started"
  | "high-score"
  | "new-high-score"
  | "first-high-score";

export type StagesProps = {
  currentStage: PageState;
};

const Stages = ({ currentStage }: StagesProps) => {
  switch (currentStage) {
    case "not-started":
      return (
        <div className="md:pb-16">
          <StageNotStarted />
        </div>
      );
    case "started":
      return (
        <div className="md:pb-16">
          <StageStarted />
        </div>
      );
  }
};

export default Stages;
