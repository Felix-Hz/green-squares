/* 
  ---------------------------------------------------------------

    API Reference: https://rapidapi.com/divad12/api/numbers-1/ 

  ---------------------------------------------------------------

    math: text | number | found | type
    trivia: text | number | found | type
    year: date | text | number | found | type 
*/

import axios, { AxiosResponse } from "axios";
import headers from "./config";

interface NumbersFact {
  text: string;
  year: number;
  number: number;
  found: Boolean;
  type: string;
  date: string;
}

const urls: Record<string, string> = {
  math: "https://numbersapi.p.rapidapi.com/1729/math?fragment=true&json=true",
  trivia:
    "https://numbersapi.p.rapidapi.com/42/trivia?fragment=true&notfound=floor&json=true",
  year: "https://numbersapi.p.rapidapi.com/1492/year?fragment=true&json=true",
};

async function getRandomFact(): Promise<NumbersFact | null> {
  const keys = Object.keys(urls);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomUrl = urls[randomKey];

  try {
    const response: AxiosResponse<NumbersFact> = await axios.get(randomUrl, {
      headers: headers,
    });

    const result: NumbersFact = response.data;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getRandomFact };
