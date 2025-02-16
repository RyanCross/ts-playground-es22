

import * as fs from "fs"
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
    tracking: Map<number, LogsByLevel>

    constructor() {
        this.tracking = new Map()
        this.parseLogs()
    }

    parseLogs(): void {
        // how to read a directory
        console.log(process.cwd())
        // join the absolute path of the executing processes' working dir ()
        const logsDirectoryPath = path.join(process.cwd(), "src/logTrackerProblem/logs/")
        console.log(logsDirectoryPath)
        // read entire directory of files:
        fs.readdirSync(logsDirectoryPath).forEach((file) => {
            const filePath = path.join(process.cwd(), "src/logTrackerProblem/logs/", file)
            console.log(filePath)

            // would require files to be copied over to build, which they are not
            const buffer = fs.readFileSync(filePath)
            const logsRaw = buffer.toString()
            const entriesRaw = logsRaw.split("\r\n")

            // iterate through each line of the file and parse into data structure
            entriesRaw.forEach((e, i) => {
                let logsByLvl: LogsByLevel = {
                    DEBUG: [],
                    INFO: [],
                    WARNING: [],
                    ERROR: [],
                    CRITICAL: []
                }
                const splitE = e.split(" ")
                let logLvl = splitE[2].substring(1, splitE[2].length - 1) as keyof LogsByLevel // INFO minus []
                let siteId = parseInt(splitE[3].substring(1, splitE[3].length - 1)) // e.g 101 minus []


                // check if siteId exists, if not add entry to dict
                if (!this.tracking.has(siteId)) {
                    this.tracking.set(siteId, _.cloneDeep(logsByLvl))
                }
                // add element to appropriate bucket
                this.tracking.get(siteId)?.[logLvl].push(e)
            })

        });

    }

    getCountOfLogType(logLevel: LOG_LEVEL): number {
        let totalOfType = 0
        this.tracking.forEach((logsByLvl) => {

            totalOfType += logsByLvl[logLevel].length
        })


        return totalOfType

    }

    //@ts-ignore
    getSiteLogs(siteId, logType?: LOG_LEVEL[]): string[] {
        const siteLogs: string[] = []

        // if site exists and types were provided
        if (this.tracking.has(siteId)) {
            const site = this.tracking.get(siteId)

            if (site) {
                if (logType && logType.length >= 1) {
                    for (let k of logType) {
                        site[k].forEach((v) => {
                            siteLogs.push(v)
                        })
                    }
                } // optional case
                else if (logType === undefined || logType.length === 0) {
                    for (let k of Object.keys(LOG_LEVEL)) {
                        site[k as keyof LogsByLevel].forEach((v) => {
                            siteLogs.push(v)
                        })
                    }
                }
            }

        }


        return siteLogs
    }

    /**
     * @returns Sites with 3 or more errors
     */
    getProblematicSites(): number[] {
        let problematicSites: number[] = []
        this.tracking.forEach((v: LogsByLevel, k: number) => {
            if (v.CRITICAL.length >= 3) {
                problematicSites.push(k)
            }
        })

        return problematicSites
    }
}
console.log(process.cwd())
let tracker = new Tracker()

// Validate function 1
assert.equal(tracker.getCountOfLogType(LOG_LEVEL.INFO), 13)
// validate function 2
assert.equal(tracker.getProblematicSites().length, 2)

// test function gets logs in from multiple files
assert.equal(tracker.getSiteLogs(111, [LOG_LEVEL.INFO]).length, 3)

// test multiple types
assert.equal(tracker.getSiteLogs(111, [LOG_LEVEL.INFO, LOG_LEVEL.ERROR]).length, 4)

// test no types provided returns all logs of site
assert.equal(tracker.getSiteLogs(111).length, 5)
