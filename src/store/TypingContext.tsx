import { useContext, createContext, useState, useEffect } from "react";

export type TypingState = {
  keyPosition: number;
  textThatWasTyped: string;
  setTextThatWasTyped: React.Dispatch<React.SetStateAction<string>>;
};

const TypingContext = createContext<TypingState>({
  keyPosition: 0,
  textThatWasTyped: "",
  setTextThatWasTyped: () => {},
});

export type TypingContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Re-Read useContext documentation to optimize for re-renders
export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [keyPosition, setKeyPosition] = useState(0);
  const [textThatWasTyped, setTextThatWasTyped] = useState("");

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const ignoredKeys = [
        "Shift",
        "Backspace",
        "CapsLock",
        "Tab",
        "Control",
        "Enter",
        "Alt",
        "NumLock",
      ];

      if (!ignoredKeys.includes(event.key)) {
        setKeyPosition((val) => val + 1);
        setTextThatWasTyped((val) => `${val}${event.key}`);
      }

      if (event.key === "Backspace") {
        setKeyPosition((val) => {
          if (val - 1 > 0) {
            return val - 1;
          }

          return 0;
        });
        setTextThatWasTyped((val) => {
          if (val.length === 0) {
            return "";
          }

          return val.substring(0, val.length - 1);
        });
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <TypingContext.Provider
      value={{
        keyPosition,
        textThatWasTyped,
        setTextThatWasTyped,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTypingContext = () => {
  const context = useContext(TypingContext);

  if (!context) {
    throw new Error(
      "useTypingContext must be used within <TypingContextProvider />",
    );
  }

  return context;
};
