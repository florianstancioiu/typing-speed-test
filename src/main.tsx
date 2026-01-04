import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StageContextProvider } from "./store/StageContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StageContextProvider>
      <App />
    </StageContextProvider>
  </StrictMode>
);
