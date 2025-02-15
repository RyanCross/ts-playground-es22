"use strict";
/**
 * What are the final values of all variables a, b, c and d after the code below?

let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Answer: a = 2, b = 2
 * c = 2
 * d = 1
 */
/**
 * What are the values of a and x after the code below?
    let a = 2;
    let x = 1 + (a *= 2);
 */
// a = 4, 
// x = 5
/**
 * What are results of these expressions?

"" + 1 + 0  = "10", "string" + number: + is a concat in this situation, and then it happens again
"" - 1 + 0  = -1, - is numeric operator so "" becomes 0
true + false = 1, turned into 1 + 0
6 / "3" = 2, numeric operator, numeric type concersion
"2" * "3" = 6, another numeric operator
4 + 5 + "px" = 9px, 4+5 evaledfirst
"$" + 4 + 5 = "$4" + 5
"4" - 2 = 2
"4px" - 2 = number is not read, this just becomes NaN
"  -9  " + 5 = " - 9 5"
"  -9  " - 5 - -14
null + 1 = 1
undefined + 1 = NaN
" \t \n" - 2 = NaN, can't resolve
 */ 
