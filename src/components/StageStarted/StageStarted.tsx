import { useEffect, useRef } from "react";
import Button from "../UI/Button/Button";
import RestartWhiteSvg from "../../images/icon-restart-white.svg?react";
import SeparatedList from "../SeparatedList/SeparatedList";
import DropdownToButtons from "../UI/DropdownToButtons/DropdownToButtons";
import TextZone from "../TextZone/TextZone";
import { useTypingContext } from "../../context/TypingContext";
import { useDifficultyContext } from "../../context/DifficultyContext";
import { useStatsContext } from "../../context/StatsContext";
import { useModeContext } from "../../context/ModeContext";
import { useStageContext } from "../../context/StageContext";
import { computeAccuracy, computeWpm } from "../../helpers/stats";

const StageStarted = () => {
  const intervalRef = useRef<number | undefined>(undefined);
  const { textThatWasTyped, setTextThatWasTyped } = useTypingContext();
  const { wpm, setWpm, accuracy, setAccuracy, time, setTime } =
    useStatsContext();
  const { textToType, difficultyOptions, onDifficultyOptionClickHandler } =
    useDifficultyContext();
  const { modeOptions, onModeOptionClickHandler } = useModeContext();
  const { isStarted, setIsStarted, setStage } = useStageContext();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isStarted) {
        return;
      }

      if (time === 0) {
        setStage("high-score-baseline");
      }

      if (time !== 0 && textThatWasTyped.length !== textToType.length) {
        setTime((val) => --val);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStarted, time, textThatWasTyped, textToType, setStage, setTime]);

  useEffect(() => {
    if (textThatWasTyped.length >= textToType.length) {
      setStage("high-score-baseline");
      clearInterval(intervalRef.current ?? undefined);
    }

    const { accuracy: computedAccuracy } = computeAccuracy(
      textThatWasTyped,
      textToType,
    );
    setAccuracy(computedAccuracy);
    setWpm(computeWpm(textThatWasTyped, 60));
  }, [textThatWasTyped, textToType, setStage, setAccuracy, setWpm]);

  const listOptions = [
    { id: 1, title: "WPM:", value: wpm },
    { id: 2, title: "Accuracy:", value: accuracy + "%" },
    { id: 3, title: "Time:", value: time + "s" },
  ];

  const restartTest = () => {
    setTextThatWasTyped("");
    setIsStarted(false);
    setTime(60);
    setAccuracy(0);
    setWpm(0);
    setStage("started");
  };

  return (
    <div className="md:pb-16">
      <div className="px-4 mb-8 md:px-8 xl:max-w-7xl xl:mx-auto xl:px-0">
        <div className="border-b border-neutral-700 pb-4">
          <SeparatedList options={listOptions} />
          <div className="flex justify-between gap-x-2.5 md:gap-x-0 md:justify-start">
            <DropdownToButtons
              title="Difficulty"
              options={difficultyOptions}
              onOptionClick={onDifficultyOptionClickHandler}
              className="md:mr-4 md:pr-4 border-r border-neutral-700"
            />
            <DropdownToButtons
              title="Mode"
              options={modeOptions}
              onOptionClick={onModeOptionClickHandler}
            />
          </div>
        </div>
      </div>
      <TextZone
        text={textToType}
        typedText={textThatWasTyped}
        isStarted={true}
      />
      <div className="grid place-content-center mb-8">
        <Button
          onClick={restartTest}
          className="flex gap-x-2.5 items-center bg-neutral-800 py-2.5 px-4"
        >
          <span>Restart Test</span>
          <RestartWhiteSvg />
        </Button>
      </div>
    </div>
  );
};

export default StageStarted;
