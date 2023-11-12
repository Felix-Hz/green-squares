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

async function updateReadme() {
  const readmePath = "../README.md";

  fs.readFile(readmePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    let updatedContent: string;
    const randomNumberFact = JSON.stringify(await getRandomFact());
    // console.log(randomNumberFact);

    if (!currentDay) {
      updatedContent = `${data}\n\n### Creation Day\n${randomNumberFact}`;
    } else {
      updatedContent = `${data}\n\n### Fact of Day ${currentDay}\n${randomNumberFact}`;
    }

    fs.writeFile(readmePath, updatedContent, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      } else {
        console.log("README updated with a new fact, and counter as well.");
        state.day += 1;
        fs.writeFileSync("./data/state.json", JSON.stringify(state));
      }
    });
  });
}

updateReadme();

// // Schedule the job to run every 24 hours
// schedule("0 0 */1 * *", () => {
//   updateReadme();
// });

// Commit and push changes
// Note: This will require appropriate permissions and setup to push changes to the repository.
