import { execSync } from "child_process";
import state from "../data/state.json";

// Execute a shell command.
const runCommand = (command: string) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

const addCommitPush = () => {
  const currentDay = state.day;
  runCommand(
    `cd .. && git add . && git commit -m 'add ${currentDay}: fact of the day' && git push`
  );
};

export { addCommitPush };
