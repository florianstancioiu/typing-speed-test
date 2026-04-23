import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TypingContextProvider } from "./store/TypingContext.tsx";
import { StageContextProvider } from "./store/StageContext.tsx";
import { DifficultyContextProvider } from "./store/DifficultyContext.tsx";
import { ModeContextProvider } from "./store/ModeContext.tsx";
import { StatsContextProvider } from "./store/StatsContext.tsx";
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
