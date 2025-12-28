import CompleteSvg from "../../images/icon-completed.svg?react";
import RestartSvg from "../../images/icon-restart.svg?react";
import StarPatternOneSvg from "../../images/star.svg?react";
import StarPatternTwoSvg from "../../images/pattern-star-2.svg?react";

import Results from "../Results/Results";
import Button from "../UI/Button/Button";
import { useTypingContext } from "../../store/TypingContext";

const StageHighScoreBaseline = () => {
  const { stats } = useTypingContext();
  const { wpm, accuracy, charactersRight, charactersWrong } = stats;

  return (
    <div className="relative xl:max-w-7xl xl:mx-auto">
      <div className="text-center px-4 mt-8 mb-6 relative md:px-8 md:mt-20 md:pt-6 md:mb-13 xl:px-0">
        <StarPatternTwoSvg className="absolute left-4 top-6 md:left-12 xl:left-0" />
        <CompleteSvg className="inline-block shadow-green-circle rounded-full mb-7 md:shadow-green-circle-large md:mb-14" />
        <p className="text-white text-2xl font-bold mb-2.5 md:text-4xl">
          Baseline Established!
        </p>
        <p className="text-base text-neutral-400 md:text-xl">
          You’ve set the bar. Now the real challenge begins—time to beat it.
        </p>
      </div>
      <Results
        wpm={wpm}
        accuracy={accuracy}
        charactersRight={charactersRight}
        charactersWrong={charactersWrong}
      />
      <Button className="rounded-xl py-2.5 px-4 bg-white text-neutral-900 flex items-center mx-auto gap-x-2.5 hover:opacity-90 focus-visible:outline-offset-4 focus-visible:outline-blue-400 focus-visible:outline-3">
        <span>Beat This Score</span>
        <RestartSvg fill="#121212" />
      </Button>
      <StarPatternOneSvg className="absolute -bottom-35 right-4 md:-bottom-20 md:right-8 md:w-16 md:h-16 xl:right-0" />
    </div>
  );
};

export default StageHighScoreBaseline;
