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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const _ = __importStar(require("lodash"));
const assert = __importStar(require("assert"));
// 1. lets create some scaffolding
// 2. examine the schema
// Approach: Simplest version of problem
// parse logs from one file
// get 3 functions working
// parse file - line by line
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL["DEBUG"] = "DEBUG";
    LOG_LEVEL["INFO"] = "INFO";
    LOG_LEVEL["WARNING"] = "WARNING";
    LOG_LEVEL["ERROR"] = "ERROR";
    LOG_LEVEL["CRITICAL"] = "CRITICAL";
})(LOG_LEVEL || (LOG_LEVEL = {}));
class Tracker {
    tracking;
    constructor() {
        this.tracking = new Map();
        this.parseLogs();
    }
    parseLogs() {
        // how to read a directory
        console.log(process.cwd());
        // join the absolute path of the executing processes' working dir ()
        const logsDirectoryPath = path.join(process.cwd(), "src/logTrackerProblem/logs/");
        console.log(logsDirectoryPath);
        // read entire directory of files:
        fs.readdirSync(logsDirectoryPath).forEach((file) => {
            const filePath = path.join(process.cwd(), "src/logTrackerProblem/logs/", file);
            console.log(filePath);
            // would require files to be copied over to build, which they are not
            const buffer = fs.readFileSync(filePath);
            const logsRaw = buffer.toString();
            const entriesRaw = logsRaw.split("\r\n");
            // iterate through each line of the file and parse into data structure
            entriesRaw.forEach((e, i) => {
                let logsByLvl = {
                    DEBUG: [],
                    INFO: [],
                    WARNING: [],
                    ERROR: [],
                    CRITICAL: []
                };
                const splitE = e.split(" ");
                let logLvl = splitE[2].substring(1, splitE[2].length - 1); // INFO minus []
                let siteId = parseInt(splitE[3].substring(1, splitE[3].length - 1)); // e.g 101 minus []
                // check if siteId exists, if not add entry to dict
                if (!this.tracking.has(siteId)) {
                    this.tracking.set(siteId, _.cloneDeep(logsByLvl));
                }
                // add element to appropriate bucket
                this.tracking.get(siteId)?.[logLvl].push(e);
            });
        });
    }
    getCountOfLogType(logLevel) {
        let totalOfType = 0;
        this.tracking.forEach((logsByLvl) => {
            totalOfType += logsByLvl[logLevel].length;
        });
        return totalOfType;
    }
    //@ts-ignore
    getSiteLogs(siteId, logType) {
        const siteLogs = [];
        // if site exists and types were provided
        if (this.tracking.has(siteId)) {
            const site = this.tracking.get(siteId);
            if (site) {
                if (logType && logType.length > 1) {
                    for (let k of logType) {
                        site[k].forEach((v) => {
                            siteLogs.push(v);
                        });
                    }
                } // optional case
                else if (logType === undefined || logType.length === 0) {
                    for (let k of Object.keys(LOG_LEVEL)) {
                        site[k].forEach((v) => {
                            siteLogs.push(v);
                        });
                    }
                }
            }
        }
        return siteLogs;
    }
    /**
     * @returns Sites with 3 or more errors
     */
    getProblematicSites() {
        let problematicSites = [];
        this.tracking.forEach((v, k) => {
            if (v.CRITICAL.length >= 3) {
                problematicSites.push(k);
            }
        });
        return problematicSites;
    }
}
console.log(process.cwd());
let tracker = new Tracker();
assert.equal(tracker.getCountOfLogType(LOG_LEVEL.INFO), 13); // for a .log
assert.equal(tracker.getProblematicSites().length, 2);
// test function gets logs in from multiple files
assert.equal(tracker.getSiteLogs(111, [LOG_LEVEL.INFO]).length, 3);
// test multiple types
assert.equal(tracker.getSiteLogs(111, [LOG_LEVEL.INFO, LOG_LEVEL.ERROR]).length, 4);
// test no types provided returns all logs of site
assert.equal(tracker.getSiteLogs(111).length, 5);
