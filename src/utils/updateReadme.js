"use strict";
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
exports.updateReadme = void 0;
const fs = __importStar(require("fs"));
const api_1 = require("./api");
const state_json_1 = __importDefault(require("../data/state.json"));
const commitToRepo_1 = require("./commitToRepo");
const textPerType_1 = require("./textPerType");
function updateReadme() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDay = state_json_1.default.day;
        const readmePath = "../README.md";
        try {
            let updatedContent;
            const randomNumberFact = yield (0, api_1.getRandomFact)();
            let type = randomNumberFact === null || randomNumberFact === void 0 ? void 0 : randomNumberFact.type;
            const data = fs.readFileSync(readmePath, "utf-8");
            if (typeof type === "string" && randomNumberFact) {
                var textForReadme = (0, textPerType_1.textPerFactType)(type, randomNumberFact);
                if (!currentDay) {
                    updatedContent = `${data}\n\n### Creation Day\n${textForReadme}`;
                }
                else {
                    updatedContent = `${data}\n\n### Fact of Day ${currentDay}\n${textForReadme}`;
                }
                fs.writeFileSync(readmePath, updatedContent, "utf-8");
                state_json_1.default.day += 1;
                fs.writeFileSync("./data/state.json", JSON.stringify(state_json_1.default));
                (0, commitToRepo_1.addCommitPush)();
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
        finally {
            // Execute the function every 24 hours.24 * 60 * 60 * 1000
            setTimeout(updateReadme, 5000);
        }
    });
}
exports.updateReadme = updateReadme;
