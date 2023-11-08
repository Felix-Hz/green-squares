/*
________         .__.__                 ____.       __                       _____                             
\______ \ _____  |__|  | ___.__.       |    | ____ |  | __ ____   ______   _/ _______________                  
 |    |  \\__  \ |  |  |<   |  |       |    |/  _ \|  |/ _/ __ \ /  ___/   \   __/  _ \_  __ \                 
 |    `   \/ __ \|  |  |_\___  |   /\__|    (  <_> |    <\  ___/ \___ \     |  |(  <_> |  | \/                 
/_______  (____  |__|____/ ____|   \________|\____/|__|_ \\___  /____  >    |__| \____/|__|                    
        \/     \/        \/                             \/    \/     \/                                        
                    ________.__  __    ___ ___      ___.          _____          __  .__      .__  __          
  _____ ___.__.    /  _____/|___/  |_ /   |   \ __ _\_ |__       /  _  \   _____/  |_|_____  _|___/  |_ ___.__.
 /     <   |  |   /   \  ___|  \   __/    ~    |  |  | __ \     /  /_\  \_/ ___\   __|  \  \/ |  \   __<   |  |
|  Y Y  \___  |   \    \_\  |  ||  | \    Y    |  |  | \_\ \   /    |    \  \___|  | |  |\   /|  ||  |  \___  |
|__|_|  / ____|    \______  |__||__|  \___|_  /|____/|___  /   \____|__  /\___  |__| |__| \_/ |__||__|  / ____|
      \/\/                \/                \/           \/            \/     \/                        \/     
*/

import * as fs from "fs";
import { getRandomFact } from "./utils/api";
import { Octokit } from "octokit";
import { schedule } from "node-cron";

let dayNumber: number = 0;

async function updateReadme() {
  const readmePath = "../README.md";

  fs.readFile(readmePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    let updatedContent: string;
    const randomNumberFact = JSON.stringify(await getRandomFact());
    console.log(randomNumberFact);

    if (!dayNumber) {
      updatedContent = `${data}\n\n### Creation Day\n${randomNumberFact}`;
    } else {
      updatedContent = `${data}\n\n### Joke of Day ${dayNumber}\n${randomNumberFact}`;
    }

    fs.writeFile(readmePath, updatedContent, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      } else {
        console.log("README updated with a new fact, and counter as well.");
        console.log(dayNumber);
      }
    });
  });
}

// Mf counter not working.
dayNumber += 1;

updateReadme();

// // Schedule the job to run every 24 hours
// schedule("0 0 */1 * *", () => {
//   updateReadme();
// });

// Commit and push changes
// Note: This will require appropriate permissions and setup to push changes to the repository.
