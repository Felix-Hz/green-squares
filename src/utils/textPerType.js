"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textPerFactType = void 0;
function textPerFactType(type, randomNumberFact) {
    let textForReadme = "";
    if (type === "math") {
        const text = `The number ${randomNumberFact.number} is ${randomNumberFact.text}.`;
        textForReadme = text;
    }
    else if (type === "year") {
        if (randomNumberFact.date) {
            const text = `In ${randomNumberFact.date} of ${randomNumberFact.number}, ${randomNumberFact.text}.`;
            textForReadme = text;
        }
        else {
            const text = `In year ${randomNumberFact.number}, ${randomNumberFact.text}.`;
            textForReadme = text;
        }
    }
    else if (type === "trivia") {
        const text = `The number ${randomNumberFact.number} is ${randomNumberFact.text}.`;
        textForReadme = text;
    }
    return textForReadme;
}
exports.textPerFactType = textPerFactType;
