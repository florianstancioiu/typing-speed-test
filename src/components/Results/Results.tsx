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
    <div>
      <div>
        <p>WPM: </p>
        <p>{wpm}</p>
      </div>
      <div>
        <p>Accuracy: </p>
        <p>{accuracy}%</p>
      </div>
      <div>
        <p>Characters:</p>
        <p>
          <span>{charactersRight}</span>
          <span>/</span>
          <span>{charactersWrong}</span>
        </p>
      </div>
    </div>
  );
};

export default Results;
