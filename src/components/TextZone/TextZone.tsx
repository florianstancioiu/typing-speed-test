import Button from "../UI/Button/Button";

export type TextZoneProps = {
  text: string | undefined;
  typedText: string;
  isStarted: boolean;
};

const TextZone = ({ text, isStarted }: TextZoneProps) => {
  const characters = text?.split("");

  return (
    <main className="px-4 mb-8 md:px-8 xl:max-w-7xl xl:mx-auto xl:px-0">
      {!isStarted && (
        <div className="relative border-b border-neutral-700 pb-4">
          <p className="text-[32px] leading-[136%] tracking-[0.4px] blur-sm">
            {text}
          </p>
          <div className="absolute h-full w-full left-0 top-0 grid place-content-center">
            <Button className="mb-5 hover:bg-blue-400 focus-visible:outline-offset-4 focus-visible:outline-blue-400 focus-visible:outline-3">
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
          <p className="text-[32px] leading-[136%] tracking-[0.4px]">
            {characters?.map((char) => {
              /*
              const correctClassName = "text-green-500";
              const incorrectClassName =
                "text-red-500 border-b-2 border-red-500";
              */
              const currentCharClassName = "text-neutral-400 bg-neutral-500";

              return <span className={currentCharClassName}>{char}</span>;
            })}
          </p>
        </div>
      )}
    </main>
  );
};

export default TextZone;
