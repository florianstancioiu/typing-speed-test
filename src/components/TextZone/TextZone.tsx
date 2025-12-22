import Button from "../UI/Button/Button";

export type TextZoneProps = {
  text: string | undefined;
  typedText: string;
  isStarted: boolean;
};

const TextZone = ({ text, isStarted }: TextZoneProps) => {
  return (
    <main className="px-4 border-b border-neutral-700 pb-4 mb-8">
      {!isStarted && (
        <div className="relative">
          <p className="text-[32px] leading-[136%] tracking-[0.4px] blur-sm">
            {text}
          </p>
          <div className="absolute h-full w-full left-0 top-0 grid place-content-center">
            <Button className="mb-5">Start Typing Test</Button>
            <p className="font-semibold text-white text-xl ">
              Or click the text and start typing
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default TextZone;
