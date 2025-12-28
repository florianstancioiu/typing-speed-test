import { useState } from "react";

import Header from "./components/UI/Header/Header";
import Stages from "./components/Stages/Stages";
import { TypingContextProvider } from "./store/TypingContext";
import { type PageState } from "./components/Stages/Stages";

const App = () => {
  const [pageState, _setPageState] = useState<PageState>("high-score-baseline");

  return (
    <>
      <TypingContextProvider>
        <Header />
        <Stages currentStage={pageState} />
      </TypingContextProvider>
    </>
  );
};

export default App;
