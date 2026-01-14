import SeparatedList from "../SeparatedList/SeparatedList";
import DropdownToButtons from "../UI/DropdownToButtons/DropdownToButtons";
import TextZone from "../TextZone/TextZone";
import { useTypingContext } from "../../store/TypingContext";

const StageNotStarted = () => {
  const {
    textToType,
    difficultyOptions,
    onDifficultyOptionClickHandler,
    modeOptions,
    onModeOptionClickHandler,
  } = useTypingContext();

  const listOptions = [
    { id: 1, title: "WPM:", value: 0 },
    { id: 2, title: "Accuracy:", value: "0%" },
    { id: 3, title: "Time:", value: "0:60" },
  ];

  return (
    <div className="md:pb-16 xl:max-w-7xl xl:mx-auto">
      <div className="px-4 mb-8 md:px-8 xl:px-0">
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
      <TextZone text={textToType} typedText="" isStarted={false} />
    </div>
  );
};

export default StageNotStarted;
