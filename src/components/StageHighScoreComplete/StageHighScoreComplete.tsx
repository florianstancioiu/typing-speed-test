import Results from "../Results/Results";
import { useTypingContext } from "../../store/TypingContext";

const StageHighScoreComplete = () => {
  const { stats } = useTypingContext();
  const { wpm, accuracy, charactersRight, charactersWrong } = stats;

  return (
    <div>
      <Results
        wpm={wpm}
        accuracy={accuracy}
        charactersRight={charactersRight}
        charactersWrong={charactersWrong}
      />
    </div>
  );
};

export default StageHighScoreComplete;
