"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommitPush = void 0;
const child_process_1 = require("child_process");
const state_json_1 = __importDefault(require("../data/state.json"));
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
    const currentDay = state_json_1.default.day;
    runCommand(`cd .. && git add . && git commit -m 'add ${currentDay}: fact of the day' && git push`);
};
exports.addCommitPush = addCommitPush;
