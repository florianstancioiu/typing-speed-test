import Button from "../UI/Button/Button";
import RestartSvg from "../../images/icon-restart.svg?react";
import SeparatedList from "../SeparatedList/SeparatedList";
import DropdownToButtons from "../UI/DropdownToButtons/DropdownToButtons";
import TextZone from "../TextZone/TextZone";
import { useTypingContext } from "../../store/TypingContext";

const StageStarted = () => {
  const {
    dummyText,
    listOptions,
    difficultyOptions,
    onDifficultyOptionClickHandler,
    modeOptions,
    onModeOptionClickHandler,
  } = useTypingContext();

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
      <TextZone text={dummyText} typedText="" isStarted={true} />
      <div className="grid place-content-center mb-8">
        <Button className="flex gap-x-2.5 items-center bg-neutral-800 py-2.5 px-4">
          <span>Restart Test</span>
          <RestartSvg />
        </Button>
      </div>
    </div>
  );
};

export default StageStarted;
