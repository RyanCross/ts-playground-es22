"use strict";
/**
 *Using the if..else construct, write the code which asks: ‘What is the “official” name of JavaScript?’

If the visitor enters “ECMAScript”, then output “Right!”, otherwise – output: “You don’t know? ECMAScript!”
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameOfJavascript = nameOfJavascript;
const readline = __importStar(require("node:readline"));
const node_process_1 = require("node:process");
function nameOfJavascript() {
    // this code has been built for node since prompt is browser world
    const rl = readline.createInterface(node_process_1.stdin, node_process_1.stdout);
    let answer = rl.question("What is the official name of Javascript?", (answer) => {
        if (answer === "ECMAScript") {
            rl.write("you are so right");
        }
        else {
            rl.write("You fucking MORON its ECMASCRIPT AHAHAHAA");
        }
    });
}
// next time lets try to read in this question from a file, where each word of the sentence is on its own line
