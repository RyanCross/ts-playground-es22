"use strict";
/**
 * Strings in javascript are immutable
 * Finding occurence positions - indexOf, lastIndexOf
 * Substr exists = includes
 * Extracting substrings - for practical use its enough to remember slice(start: inclusive, stop: exclusive)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUnaryPlusOnNumberLikeString = testUnaryPlusOnNumberLikeString;
/**
 * Write a function ucFirst(str) that returns the string str with the uppercased first character, for instance:
 *
 * ucFirst("john") == "John";
 * @param {*} str
 * @returns
 */
function ucFirst(str) {
    if (str) {
        str = str[0].toUpperCase() + str.slice(1);
    }
    return str;
}
/**
 * Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.

  The function must be case-insensitive:

   checkSpam('buy ViAgRA now') == true
   checkSpam('free xxxxx') == true
   checkSpam("innocent rabbit") == false
 * @param {*} str
 * @returns
 */
function checkSpam(str) {
    // lower or uppercase
    str = str.trim().toLowerCase();
    if (str.includes("xxx") || str.includes("viagra")) {
        return true;
    }
    return false;
}
// slice is slice(start, stop) - stop (but not include)
// can think of a knife thats able to slice from either end. Thats why it supports negatives 
function truncate(str, maxLength) {
    // slice supports negative indices, substring does not. There are a couple other behavior diffs but this is the big one
    // the last index is exclusive (not included) Since maxLength will be equal to the idx + 1 of this 0 indexed array if we want to exclude the last character we need to go back one
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 1) + String.fromCodePoint(0x2026);
        console.log(str);
    }
    return str;
}
/**
 * We have a cost in the form "$120". That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value from such string and return it.

The example:

alert( extractCurrencyValue('$120') === 120 ); // true
 * @param {*} str
 * @returns
 */
function extractCurrencyValue(str) {
    // value after $ cannot be coerced to number
    str = str.trim();
    // extract a string after a specific character is found
    // find the index of a specific value
    let signIdx = str.indexOf("$");
    if (signIdx === -1) {
        return 0;
    }
    return Number.parseInt(str.slice(signIdx + 1));
}
function testUnaryPlusOnNumberLikeString(s) {
    console.log(s);
    console.log(+s);
    console.log(Number(s));
    //testUnaryPlusOnNumberLikeString(" 4   ") // 4
    // testUnaryPlusOnNumberLikeString("4px") // NAN
}
