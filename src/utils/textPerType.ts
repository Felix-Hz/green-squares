interface RandomNumberFact {
  number?: number;
  date?: string;
  text: string;
}

function textPerFactType(
  type: string,
  randomNumberFact: RandomNumberFact
): string {
  let textForReadme = "";

  if (type === "math") {
    const text = `The number ${randomNumberFact.number} is ${randomNumberFact.text}.`;
    textForReadme = text;
  } else if (type === "year") {
    if (randomNumberFact.date) {
      const text = `In ${randomNumberFact.date} of ${randomNumberFact.number}, ${randomNumberFact.text}.`;
      textForReadme = text;
    } else {
      const text = `In year ${randomNumberFact.number}, ${randomNumberFact.text}.`;
      textForReadme = text;
    }
  } else if (type === "trivia") {
    const text = `The number ${randomNumberFact.number} is ${randomNumberFact.text}.`;
    textForReadme = text;
  }

  return textForReadme;
}

export { textPerFactType };
