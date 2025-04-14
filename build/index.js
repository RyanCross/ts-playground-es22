"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("./javascriptDotInfo/fundamentals/async");
//nameOfJavascript()
console.log(0 / 2); // either NaN or 0
funcDeclaration(1, 2);
const funcExpression = function (a, b) {
    if (typeof (a) == "string") {
        return a + b;
    }
};
function funcDeclaration(a, b) {
    return a + b;
}
console.log(funcExpression(1, 2));
console.log(funcDeclaration(1, 2));
(0, async_1.validatePromiseExecutorImmediatelyInvoked)();
console.log("Still in code");
// inspectPromiseStruct()
// testResult()
// testDelay(3000)
(0, async_1.microVsMacrotask)();
// the process seems to exit 
