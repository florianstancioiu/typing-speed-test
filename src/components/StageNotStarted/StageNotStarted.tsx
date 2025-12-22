import SeparatedList from "../SeparatedList/SeparatedList";
import DropdownToButtons from "../UI/DropdownToButtons/DropdownToButtons";
import TextZone from "../TextZone/TextZone";
import { useTyping } from "../../store/TypingContext";

const StageNotStarted = () => {
  const {
    dummyText,
    listOptions,
    difficultyOptions,
    onDifficultyOptionClickHandler,
    modeOptions,
    onModeOptionClickHandler,
  } = useTyping();

  return (
    <>
      <div className="px-4 mb-8 md:px-8">
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
      <TextZone text={dummyText} typedText="" isStarted={false} />
    </>
  );
};

export default StageNotStarted;
