import { nameOfJavascript } from "./javascriptDotInfo/fundamentals/conditionalBranching";
import { testUnaryPlusOnNumberLikeString } from "./javascriptDotInfo/fundamentals/strings";
import { inspectPromiseStruct, microVsMacrotask, testDelay, testResult, validatePromiseExecutorImmediatelyInvoked } from "./javascriptDotInfo/fundamentals/async";

//nameOfJavascript()
console.log(0 / 2) // either NaN or 0

funcDeclaration(1,2)

type numberOrString = number | string

const funcExpression = function(a: numberOrString, b: numberOrString) {
    if (typeof(a) == "string") {
        return a + b
    }
    
}

function funcDeclaration(a: number, b: number) {
    return a + b
}

console.log(funcExpression(1,2))
console.log(funcDeclaration(1,2))

validatePromiseExecutorImmediatelyInvoked()
console.log("Still in code")
// inspectPromiseStruct()
// testResult()
// testDelay(3000)
microVsMacrotask()
// the process seems to exit 