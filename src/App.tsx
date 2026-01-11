import type { ChangeEvent } from "react";

import Header from "./components/UI/Header/Header";
import Stages from "./components/Stages/Stages";
import { useTypingContext } from "./store/TypingContext";
import type { Stage } from "./store/TypingContext";

const App = () => {
  const { setStage } = useTypingContext();

  const stages: Stage[] = [
    "not-started",
    "started",
    "high-score-baseline",
    "high-score-complete",
    "high-score-smashed",
  ];

  return (
    <>
      <select
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          setStage(event.target.value as Stage);
        }}
        className="h-5 mx-auto block mt-4 mb-4 bg-white text-black px-2 rounded"
      >
        {stages.map((stage) => (
          <option key={stage}>{stage}</option>
        ))}
      </select>
      <Header />
      <Stages />
    </>
  );
};

export default App;
