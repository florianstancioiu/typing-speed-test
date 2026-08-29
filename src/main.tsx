import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TypingContextProvider } from "./context/TypingContext.tsx";
import { StageContextProvider } from "./context/StageContext.tsx";
import { DifficultyContextProvider } from "./context/DifficultyContext.tsx";
import { ModeContextProvider } from "./context/ModeContext.tsx";
import { StatsContextProvider } from "./context/StatsContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StageContextProvider>
      <DifficultyContextProvider>
        <ModeContextProvider>
          <TypingContextProvider>
            <StatsContextProvider>
              <App />
            </StatsContextProvider>
          </TypingContextProvider>
        </ModeContextProvider>
      </DifficultyContextProvider>
    </StageContextProvider>
  </StrictMode>,
);
