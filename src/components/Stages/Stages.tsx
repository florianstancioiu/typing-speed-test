import StageNotStarted from "../StageNotStarted/StageNotStarted";
import StageStarted from "../StageStarted/StageStarted";
import StageHighScoreComplete from "../StageHighScoreComplete/StageHighScoreComplete";
import StageHighScoreSmashed from "../StageHighScoreSmashed/StageHighScoreSmashed";
import StageHighScoreBaseline from "../StageHighScoreBaseline/StageHighScoreBaseline";
import { useStageContext } from "../../store/StageContext";

// TODO: Rename this component to Pages
const Stages = () => {
  const { stage } = useStageContext();

  switch (stage) {
    case "not-started":
      return <StageNotStarted />;
    case "started":
      return <StageStarted />;
    case "high-score-complete":
      return <StageHighScoreComplete />;
    case "high-score-smashed":
      return <StageHighScoreSmashed />;
    case "high-score-baseline":
      return <StageHighScoreBaseline />;
  }
};

export default Stages;
