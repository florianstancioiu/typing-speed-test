import NewPersonalBestSvg from "../../images/icon-new-pb.svg?react";
import RestartSvg from "../../images/icon-restart.svg?react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import type { TConductorInstance } from "react-canvas-confetti/dist/types";

import Results from "../Results/Results";
import Button from "../UI/Button/Button";
import { useTypingContext } from "../../store/TypingContext";

const StageHighScoreSmashed = () => {
  const { stats } = useTypingContext();
  const { wpm, accuracy, charactersRight, charactersWrong } = stats;

  const onRealisticConfettiInitHandler = ({
    conductor,
  }: {
    conductor: TConductorInstance;
  }) => {
    conductor.shoot();
  };

  return (
    <div className="relative">
      <div className="text-center px-4 mt-8 mb-6 relative md:px-8 md:mt-20 md:pt-6 md:mb-13">
        <NewPersonalBestSvg className="inline-block rounded-full mb-7 md:mb-14" />
        <p className="text-white text-2xl font-bold mb-2.5 md:text-4xl">
          High Score Smashed!
        </p>
        <p className="text-base text-neutral-400 md:text-xl">
          You’re getting faster. That was incredible typing.
        </p>
      </div>
      <Results
        wpm={wpm}
        accuracy={accuracy}
        charactersRight={charactersRight}
        charactersWrong={charactersWrong}
      />
      <Button className="rounded-xl py-2.5 px-4 bg-white text-neutral-900 flex items-center mx-auto gap-x-2.5">
        <span>Beat This Score</span>
        <RestartSvg fill="#121212" />
      </Button>
      <Realistic onInit={onRealisticConfettiInitHandler} />
    </div>
  );
};

export default StageHighScoreSmashed;
