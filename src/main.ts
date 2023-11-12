/*
      ##### ##                    ###                          ##### ##                                    
   /#####  /##                #    ###                      ######  /### /                                 
 //    /  / ###              ###    ##                     /#   /  /  ##/                     #            
/     /  /   ###              #     ##                    /    /  /    #                     ##            
     /  /     ###                   ##                        /  /                           ##            
    ## ##      ##    /###   ###     ##  ##   ####            ## ##       /###     /###     ######## /###   
    ## ##      ##   / ###  / ###    ##   ##    ###  /        ## ##      / ###  / / ###  / ######## / #### /
    ## ##      ##  /   ###/   ##    ##   ##     ###/         ## ###### /   ###/ /   ###/     ##   ##  ###/ 
    ## ##      ## ##    ##    ##    ##   ##      ##          ## ##### ##    ## ##            ##  ####      
    ## ##      ## ##    ##    ##    ##   ##      ##          ## ##    ##    ## ##            ##    ###     
    #  ##      ## ##    ##    ##    ##   ##      ##          #  ##    ##    ## ##            ##      ###   
       /       /  ##    ##    ##    ##   ##      ##             #     ##    ## ##            ##        ### 
  /###/       /   ##    /#    ##    ##   ##      ##         /####     ##    /# ###     /     ##   /###  ## 
 /   ########/     ####/ ##   ### / ### / #########        /  #####    ####/ ## ######/      ##  / #### /  
/       ####        ###   ##   ##/   ##/    #### ###      /    ###      ###   ## #####        ##    ###/   
#                                                 ###     #                                                
 ##                                        #####   ###     ##                                              
                                         /#######  /#                                                      
                                        /      ###/                                                        
*/

import * as fs from "fs";
import state from "./data/state.json";
import { getRandomFact } from "./utils/api";

// import { Octokit } from "octokit";
// import { schedule } from "node-cron";

const currentDay = state.day;
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
updateReadme();

// // Schedule the job to run every 24 hours
// schedule("0 0 */1 * *", () => {
//   updateReadme();
// });

// Commit and push changes
// Note: This will require appropriate permissions and setup to push changes to the repository.
