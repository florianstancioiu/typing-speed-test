export const computeWpm = (text: string, time: number) => {
  return Math.round((text.length / 5) * (60 / time));
};

export const computeAccuracy = (textTyped: string, text: string) => {
  let correctChars = 0;

  for (let i = 0; i < textTyped.length; i++) {
    if (textTyped[i] === text[i]) {
      correctChars++;
    }
  }

  let accuracy = (correctChars / textTyped.length) * 100;
  accuracy = isNaN(accuracy) ? 0 : accuracy;

  return {
    accuracy: Math.round(accuracy),
    correctChars,
    incorrectChars: textTyped.length - correctChars,
  };
};
