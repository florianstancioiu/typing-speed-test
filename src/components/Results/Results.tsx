export type ResultsProps = {
  wpm: number;
  accuracy: number;
  charactersRight: number;
  charactersWrong: number;
};

const Results = ({
  wpm,
  accuracy,
  charactersRight,
  charactersWrong,
}: ResultsProps) => {
  return (
    <div className="px-4 mb-10 relative md:grid md:grid-cols-3 md:gap-x-5 md:px-8 md:mb-16 xl:max-w-130 xl:mx-auto xl:px-0">
      <div className="p-4 rounded-lg border border-neutral-700 mb-4 md:px-6 xl:px-4">
        <p className="text-neutral-400 text-xl mb-3 md:tracking-tighter">
          WPM:{" "}
        </p>
        <p className="font-bold text-2xl text-white">{wpm}</p>
      </div>
      <div className="p-4 rounded-lg border border-neutral-700 mb-4 md:px-6 xl:px-4">
        <p className="text-neutral-400 text-xl mb-3 md:tracking-tighter">
          Accuracy:{" "}
        </p>
        <p className="font-bold text-2xl text-red-500">{accuracy}%</p>
      </div>
      <div className="p-4 rounded-lg border border-neutral-700 mb-4 md:px-6 xl:px-4">
        <p className="text-neutral-400 text-xl mb-3 md:tracking-tighter">
          Characters:
        </p>
        <p className="font-bold text-2xl">
          <span className="text-green-500">{charactersRight}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-red-500">{charactersWrong}</span>
        </p>
      </div>
    </div>
  );
};

export default Results;
