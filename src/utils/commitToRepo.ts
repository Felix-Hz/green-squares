import { execSync } from "child_process";

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
  runCommand("cd ../..");
  runCommand("git add .");
  runCommand('git commit -m "test autom script"');
  runCommand("git push");
};

export { addCommitPush };
