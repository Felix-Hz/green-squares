"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommitPush = void 0;
const child_process_1 = require("child_process");
// Execute a shell command.
const runCommand = (command) => {
    try {
        (0, child_process_1.execSync)(command, { stdio: "inherit" });
    }
    catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
};
const addCommitPush = () => {
    runCommand("cd ..");
    runCommand("git add .");
    runCommand('git commit -m "test autom script"');
    runCommand("git push");
};
exports.addCommitPush = addCommitPush;
