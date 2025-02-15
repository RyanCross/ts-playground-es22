"use strict";
//@ts-nocheck
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
const fs_1 = require("fs");
const path = __importStar(require("path"));
const _ = __importStar(require("lodash"));
const assert = __importStar(require("assert"));
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL["DEBUG"] = "DEBUG";
    LOG_LEVEL["INFO"] = "INFO";
    LOG_LEVEL["WARNING"] = "WARNING";
    LOG_LEVEL["ERROR"] = "ERROR";
    LOG_LEVEL["CRITICAL"] = "CRITICAL";
})(LOG_LEVEL || (LOG_LEVEL = {}));
class Tracker {
    entries;
    tracking;
    constructor() {
        this.tracking = new Map();
        this.entries = this.parseLogs();
    }
    parseLogs() {
        // how to read a directory
        const filePath = path.join(__dirname, "../logs/a.log");
        console.log(filePath);
        // would require files to be copied over to build, which they are not
        const buffer = (0, fs_1.readFileSync)("./src/logTrackerProblem/logs/a.log");
        const logsRaw = buffer.toString();
        const entriesRaw = logsRaw.split("\r\n");
        console.log(logsRaw);
        let entries = [];
        // iterate through each line and parse into data structure
        entriesRaw.forEach((e, i) => {
            let logsByLvl = {
                DEBUG: [],
                INFO: [],
                WARNING: [],
                ERROR: [],
                CRITICAL: []
            };
            const splitE = e.split(" ");
            let logLvl = splitE[2]; //[INFO]
            console.log(logLvl);
            let siteId = splitE[3]; // [101]
            // remove brackets, first and last char
            siteId = siteId.substring(1, siteId.length - 1);
            console.log(siteId);
            logLvl = logLvl.substring(1, logLvl.length - 1);
            console.log(logLvl);
            // check if siteId exists, if not add entry to dict
            if (!this.tracking.has(siteId)) {
                this.tracking.set(siteId, _.cloneDeep(logsByLvl));
            }
            // add element to appropriate bucket
            this.tracking.get(siteId)[logLvl].push(e);
        });
    }
    getCountOfLogType(logLevel) {
        let totalOfType;
        this.tracking.forEach((logsByLvl) => {
            totalOfType += logsByLvl[logLevel].length;
        });
        return totalOfType;
    }
    getCriticalLogs() {
    }
    /**
     * @returns Sites with 3 or more errors
     */
    getProblematicSites() {
    }
}
console.log(process.cwd());
let tracker = new Tracker();
assert.equal(tracker.getCountOfLogType("INFO"), 3); // for a .log
