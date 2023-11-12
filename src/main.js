"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const state_json_1 = __importDefault(require("./data/state.json"));
const api_1 = require("./utils/api");
// import { Octokit } from "octokit";
// import { schedule } from "node-cron";
const currentDay = state_json_1.default.day;
function updateReadme() {
    return __awaiter(this, void 0, void 0, function* () {
        const readmePath = "../README.md";
        fs.readFile(readmePath, "utf-8", (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error("Error reading the file:", err);
                return;
            }
            let updatedContent;
            const randomNumberFact = JSON.stringify(yield (0, api_1.getRandomFact)());
            // console.log(randomNumberFact);
            if (!currentDay) {
                updatedContent = `${data}\n\n### Creation Day\n${randomNumberFact}`;
            }
            else {
                updatedContent = `${data}\n\n### Fact of Day ${currentDay}\n${randomNumberFact}`;
            }
            fs.writeFile(readmePath, updatedContent, "utf-8", (err) => {
                if (err) {
                    console.error("Error writing to the file:", err);
                    return;
                }
                else {
                    console.log("README updated with a new fact, and counter as well.");
                    state_json_1.default.day += 1;
                    fs.writeFileSync("./data/state.json", JSON.stringify(state_json_1.default));
                }
            });
        }));
    });
}
updateReadme();
// // Schedule the job to run every 24 hours
// schedule("0 0 */1 * *", () => {
//   updateReadme();
// });
// Commit and push changes
// Note: This will require appropriate permissions and setup to push changes to the repository.
