/**
 *Using the if..else construct, write the code which asks: ‘What is the “official” name of JavaScript?’

If the visitor enters “ECMAScript”, then output “Right!”, otherwise – output: “You don’t know? ECMAScript!”
 */

import * as readline from 'node:readline';
import {stdin as input, stdout as output} from "node:process"

export function nameOfJavascript() {
    // this code has been built for node since prompt is browser world
    const rl = readline.createInterface(input, output)
    let answer = rl.question("What is the official name of Javascript?", (answer) => {
        if (answer === "ECMAScript") {
            rl.write("you are so right")
        } else {
            rl.write("You fucking MORON its ECMASCRIPT AHAHAHAA")
        }
    })
   
}

// next time lets try to read in this question from a file, where each word of the sentence is on its own line