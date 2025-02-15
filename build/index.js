"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
