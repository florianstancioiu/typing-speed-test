export type Stats = {
  wpm: number;
  accuracy: number;
  charactersRight: number;
  charactersWrong: number;
};

export type StatsReducerAction = {
  type: "setWPM" | "setAccuracy" | "setCharactersRight" | "setCharactersWrong";
  payload: number;
};

export const initialStats = {
  wpm: 85,
  accuracy: 90,
  charactersRight: 120,
  charactersWrong: 5,
};

export const statsReducer = (state: Stats, action: StatsReducerAction) => {
  switch (action.type) {
    case "setWPM":
      return { ...state, wpm: action.payload };
    case "setAccuracy":
      return { ...state, accuracy: action.payload };
    case "setCharactersRight":
      return { ...state, charactersRight: action.payload };
    case "setCharactersWrong":
      return { ...state, charactersWrong: action.payload };
  }
};
