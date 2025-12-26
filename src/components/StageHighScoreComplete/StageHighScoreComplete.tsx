import CompleteSvg from "../../images/icon-completed.svg?react";
import RestartSvg from "../../images/icon-restart.svg?react";
import StarPatternOneSvg from "../../images/pattern-star-1.svg?react";
import StarPatternTwoSvg from "../../images/pattern-star-2.svg?react";

import Results from "../Results/Results";
import Button from "../UI/Button/Button";
import { useTypingContext } from "../../store/TypingContext";

const StageHighScoreComplete = () => {
  const { stats } = useTypingContext();
  const { wpm, accuracy, charactersRight, charactersWrong } = stats;

  return (
    <div>
      <div className="text-center px-4 mt-8 mb-6">
        <CompleteSvg className="inline-block shadow-green-circle rounded-full mb-7" />
        <p className="text-white text-2xl font-bold mb-2.5">Test Complete!</p>
        <p className="text-base text-neutral-400">
          Solid run. Keep pushing to beat your high score.
        </p>
      </div>
      <Results
        wpm={wpm}
        accuracy={accuracy}
        charactersRight={charactersRight}
        charactersWrong={charactersWrong}
      />
      <Button className="rounded-xl py-2.5 px-4 bg-white text-neutral-900 flex items-center mx-auto gap-x-2.5">
        <span>Go Again</span>
        <RestartSvg fill="#121212" />
      </Button>
    </div>
  );
};

export default StageHighScoreComplete;
