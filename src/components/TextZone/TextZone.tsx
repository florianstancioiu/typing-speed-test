import Button from "../UI/Button/Button";
import { useTypingContext } from "../../store/TypingContext";

export type TextZoneProps = {
  text: string | undefined;
  typedText: string;
  isStarted: boolean;
};

const TextZone = ({ text, typedText, isStarted }: TextZoneProps) => {
  const characters = text?.split("");
  const typedCharacters = typedText.split("");
  console.log("typedCharacters: ", typedCharacters);
  const { setStage } = useTypingContext();

  const startTyping = () => {
    setStage("started");
  };

  return (
    <main className="px-4 mb-8 md:px-8 xl:max-w-7xl xl:mx-auto xl:px-0">
      {!isStarted && (
        <div
          onClick={startTyping}
          className="relative border-b border-neutral-700 pb-4"
        >
          <p className="text-[32px] leading-[136%] tracking-[0.4px] blur-sm">
            {text}
          </p>
          <div className="absolute h-full w-full left-0 top-0 grid place-content-center">
            <Button
              onClick={startTyping}
              className="mb-5 hover:bg-blue-400 focus-visible:outline-offset-4 focus-visible:outline-blue-400 focus-visible:outline-3"
            >
              Start Typing Test
            </Button>
            <p className="font-semibold text-white text-xl ">
              Or click the text and start typing
            </p>
          </div>
        </div>
      )}
      {isStarted && (
        <div className="relative">
          <p className="text-[32px] leading-[136%] tracking-[0.4px] select-none">
            {characters?.map((char, index) => {
              if (index < typedCharacters.length) {
                if (typedCharacters[index] === char) {
                  return (
                    <span key={index} className="text-green-500">
                      {char}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={index}
                      className="text-red-500 border-b-2 border-red-500"
                    >
                      {char}
                    </span>
                  );
                }
              }
              if (index === typedCharacters.length) {
                return (
                  <span key={index} className="text-neutral-400 bg-neutral-500">
                    {char}
                  </span>
                );
              }

              return <span key={index}>{char}</span>;
            })}
          </p>
        </div>
      )}
    </main>
  );
};

export default TextZone;
