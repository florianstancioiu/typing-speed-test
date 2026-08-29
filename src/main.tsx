import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TypingContextProvider } from "./context/TypingContext.tsx";
import { ModeContextProvider } from "./context/ModeContext.tsx";
import { StatsContextProvider } from "./context/StatsContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModeContextProvider>
      <TypingContextProvider>
        <StatsContextProvider>
          <App />
        </StatsContextProvider>
      </TypingContextProvider>
    </ModeContextProvider>
  </StrictMode>,
);
