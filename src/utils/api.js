"use strict";
/*
  ---------------------------------------------------------------

    API Reference: https://rapidapi.com/divad12/api/numbers-1/

  ---------------------------------------------------------------
*/
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
exports.getRandomFact = void 0;
const axios_1 = __importDefault(require("axios"));
const config_js_1 = __importDefault(require("./config.js"));
const urls = {
    math: "https://numbersapi.p.rapidapi.com/1729/math?fragment=true&json=true",
    random: "https://numbersapi.p.rapidapi.com/random/trivia?min=10&max=20&fragment=true&json=true",
    trivia: "https://numbersapi.p.rapidapi.com/42/trivia?fragment=true&notfound=floor&json=true",
    year: "https://numbersapi.p.rapidapi.com/1492/year?fragment=true&json=true",
};
function getRandomFact() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = Object.keys(urls);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomUrl = urls[randomKey];
        try {
            const response = yield axios_1.default.get(randomUrl, {
                headers: config_js_1.default,
            });
            const result = response.data;
            console.log(result);
            return result;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
exports.getRandomFact = getRandomFact;
