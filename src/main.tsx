import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TypingContextProvider } from "./store/TypingContext.tsx";
import { StageContextProvider } from "./store/StageContext.tsx";
import { DifficultyAndModeContextProvider } from "./store/DifficultyAndModeContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StageContextProvider>
      <DifficultyAndModeContextProvider>
        <TypingContextProvider>
          <App />
        </TypingContextProvider>
      </DifficultyAndModeContextProvider>
    </StageContextProvider>
  </StrictMode>,
);
