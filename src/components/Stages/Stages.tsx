import StageNotStarted from "../StageNotStarted/StageNotStarted";

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
  }
};

export default Stages;
