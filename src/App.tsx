import Header from "./components/UI/Header/Header";
import SeparatedList from "./components/SeparatedList/SeparatedList";
import DropdownToButtons from "./components/UI/DropdownToButtons/DropdownToButtons";
import TextZone from "./components/TextZone/TextZone";

const App = () => {
  const dummyText = `The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn't as modern as we assume."`;

  const listOptions = [
    { id: 1, title: "WPM:", value: 0 },
    { id: 2, title: "Accuracy:", value: "100%" },
    { id: 3, title: "Time:", value: "0:60" },
  ];

  const difficultyOptions = [
    {
      id: 1,
      title: "Easy",
      value: "easy",
      isActive: false,
    },
    {
      id: 2,
      title: "Medium",
      value: "medium",
      isActive: false,
    },
    {
      id: 3,
      title: "Hard",
      value: "hard",
      isActive: true,
    },
  ];

  const modeOptions = [
    {
      id: 1,
      title: "Timed (60s)",
      value: "timed-60-seconds",
      isActive: true,
    },
    {
      id: 2,
      title: "Passage",
      value: "passage",
      isActive: false,
    },
  ];

  return (
    <>
      <Header />
      <div>
        <div className="px-4 mb-8">
          <div className="border-b border-neutral-700 pb-4">
            <SeparatedList options={listOptions} />
            <div className="flex justify-between gap-x-2.5">
              <DropdownToButtons options={difficultyOptions} />
              <DropdownToButtons options={modeOptions} />
            </div>
          </div>
        </div>
        <TextZone text={dummyText} typedText="" isStarted={false} />
      </div>
    </>
  );
};

export default App;
