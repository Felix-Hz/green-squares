import * as fs from "fs";
import { getRandomFact } from "./api";
import state from "../data/state.json";
import { textPerFactType } from "./textPerType";

async function updateReadme() {
  const currentDay = state.day;
  const readmePath = "../README.md";
  try {
    let updatedContent: string;
    const randomNumberFact = await getRandomFact();
    let type = randomNumberFact?.type;

    const data = fs.readFileSync(readmePath, "utf-8");

    if (typeof type === "string" && randomNumberFact) {
      var textForReadme = textPerFactType(type, randomNumberFact);
      if (!currentDay) {
        updatedContent = `${data}\n\n### Creation Day\n${textForReadme}`;
      } else {
        updatedContent = `${data}\n\n### Fact of Day ${currentDay}\n${textForReadme}`;
      }

      fs.writeFileSync(readmePath, updatedContent, "utf-8");

      state.day += 1;
      fs.writeFileSync("./data/state.json", JSON.stringify(state));

      // Trigger the function that realizes the commit in this part of the loop.
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setTimeout(updateReadme, 10000);
  }
}

export { updateReadme };
