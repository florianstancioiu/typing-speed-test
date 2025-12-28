import { useState } from "react";
import type { ChangeEvent } from "react";

import Header from "./components/UI/Header/Header";
import Stages from "./components/Stages/Stages";
import { TypingContextProvider } from "./store/TypingContext";
import { type PageState } from "./components/Stages/Stages";

const App = () => {
  const [pageState, setPageState] = useState<PageState>("not-started");

  const stages: PageState[] = [
    "not-started",
    "started",
    "high-score-baseline",
    "high-score-complete",
    "high-score-smashed",
  ];

  return (
    <>
      <TypingContextProvider>
        <select
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setPageState(event.target.value as PageState);
          }}
          className="h-5 mx-auto block mt-4 mb-4"
        >
          {stages.map((stage) => (
            <option key={stage}>{stage}</option>
          ))}
        </select>
        <Header />
        <Stages currentStage={pageState} />
      </TypingContextProvider>
    </>
  );
};

export default App;
