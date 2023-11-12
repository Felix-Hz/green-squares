import * as fs from "fs";
import { getRandomFact } from "./api";
import state from "../data/state.json";
import { textPerFactType } from "./textPerType";

const currentDay = state.day;

async function updateReadme() {
  let updatedContent: string;
  const readmePath = "../README.md";
  const randomNumberFact = await getRandomFact();
  let type = randomNumberFact?.type;

  fs.readFile(readmePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    if (typeof type === "string" && randomNumberFact) {
      var textForReadme = textPerFactType(type, randomNumberFact);
      if (!currentDay) {
        updatedContent = `${data}\n\n### Creation Day\n${textForReadme}`;
      } else {
        updatedContent = `${data}\n\n### Fact of Day ${currentDay}\n${textForReadme}`;
      }
      fs.writeFile(readmePath, updatedContent, "utf-8", (err) => {
        if (err) {
          console.error("Error writing to the file:", err);
          return;
        } else {
          state.day += 1;
          fs.writeFileSync("./data/state.json", JSON.stringify(state));
        }
      });
    } else {
      console.error("Nope, nopity nope.");
    }
  });
}

export { updateReadme };
