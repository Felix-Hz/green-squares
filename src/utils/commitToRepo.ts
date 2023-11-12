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
  runCommand(
    "cd .. && git add . && git commit -m 'test autom script' && git push"
  );
};

export { addCommitPush };
