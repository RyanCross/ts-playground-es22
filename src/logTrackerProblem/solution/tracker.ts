//@ts-nocheck

import { readFileSync } from "fs"
import { cwd } from "process"
import * as path from "path"
import * as _ from "lodash"
import * as assert from "assert"

// 1. lets create some scaffolding
// 2. examine the schema


// Approach: Simplest version of problem
// parse logs from one file
// get 3 functions working

// parse file - line by line



// only going to parse data we care about to save time
interface Entry {
    siteId: number
    logLevel: LOG_LEVEL
}

enum LOG_LEVEL {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL"
}

interface LogsByLevel {
    DEBUG: Array<string>,
    INFO: Array<string>,
    WARNING: Array<string>,
    ERROR: Array<string>,
    CRITICAL: Array<string>
}

class Tracker {
    entries: Entry[]
    tracking: Map<number, LogsByLevel>

    constructor() {
        this.tracking = new Map()
        this.entries = this.parseLogs()
    }

    parseLogs(): Entry[] {
        // how to read a directory
        const filePath = path.join(__dirname, "../logs/a.log")
        console.log(filePath)
        // would require files to be copied over to build, which they are not


        const buffer = readFileSync("./src/logTrackerProblem/logs/a.log")
        const logsRaw = buffer.toString()
        const entriesRaw = logsRaw.split("\r\n")
        console.log(logsRaw)

        let entries: Entry = []

        // iterate through each line and parse into data structure
        entriesRaw.forEach((e, i) => {
            let logsByLvl : LogsByLevel = {
                DEBUG: [],
                INFO: [],
                WARNING: [],
                ERROR: [],
                CRITICAL: []
            }
            const splitE = e.split(" ")
            let logLvl = splitE[2] //[INFO]
            console.log(logLvl)
            let siteId = splitE[3] // [101]

            // remove brackets, first and last char
            siteId = siteId.substring(1, siteId.length - 1)
            console.log(siteId)

            logLvl = logLvl.substring(1, logLvl.length - 1)
            console.log(logLvl) 

            // check if siteId exists, if not add entry to dict
            if(!this.tracking.has(siteId)) {
                this.tracking.set(siteId, _.cloneDeep(logsByLvl))
            }
            // add element to appropriate bucket
            this.tracking.get(siteId)[logLvl].push(e)
        })

    }

    getCountOfLogType(logLevel : LOG_LEVEL): number {
        let totalOfType = 0
        this.tracking.forEach((logsByLvl) => {
            
            totalOfType += logsByLvl[logLevel].length
        })
        
        
        return totalOfType

    }
    getCriticalLogs(): Entry[] {
    }

    /**
     * @returns Sites with 3 or more errors
     */
    getProblematicSites(): number[] {

    }
}
console.log(process.cwd())
let tracker = new Tracker()

assert.equal(tracker.getCountOfLogType("INFO"), 3) // for a .log