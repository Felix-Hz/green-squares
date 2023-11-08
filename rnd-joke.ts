import * as fs from "fs";
import { Octokit } from "octokit";
import { schedule } from "node-cron";

function getRandomJoke(): Promise<string> {
  // Jokes API

  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she should embrace her mistakes. She gave me a hug.",
  ];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  return Promise.resolve(randomJoke);
}

function updateReadme() {
  let day_number: number = 0;
  const readmePath = "./README.md";

  fs.readFile(readmePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    let updatedContent: any;
    const joke = getRandomJoke();

    if (!day_number) {
      updatedContent = `${data}\n\n### Creation Day\n${joke}`;
    } else {
      updatedContent = `${data}\n\n### Joke of Day ${day_number}\n${joke}`;
    }

    fs.writeFile(readmePath, updatedContent, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }
      day_number += 1;
      console.log("README updated with a new joke, and counter as well.");
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
