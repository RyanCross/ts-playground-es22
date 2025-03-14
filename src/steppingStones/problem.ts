import assert from "node:assert";

console.log("hi")

/**
 * 
 *  "You're stranded on a chain of small islands, 
 *  represented as a series of stepping stones (an array of positions).
 *  Each stone has a number on it, which represents the maximum number of stones you can jump forward from there.
 *  Some stones allow long jumps, while others only let you move a short distance.
 *  You cannot jump off of a stone that has a zero on it, 
 *  write a program that could determine if you could reach the end of the series of stones"
 * 
 * expected output : true or false, is there a path through the stones
 * stone cannot be negative
 * 
 * [2, 4, 3, 0, 1]
 * 
 * [3, 4, 0, 1, 0]
 * 
 * 
 * 
 * approaches
 * 
 * at every stone, we try to move the max number of steps until we the end (array.size - 1)
 * at every stone, there a x possible positions to jump to, x being the value at arr[i],
 * we gonna jump to a new position if that position is not 0
 * try to move as far as we can, if moving would result in landing on a 0 stone, then move one space shorter
 * if we exhaust all possible jumps then return false
 * if the last element is 0, still counts as the end.
 * 
 * 
 */
function stepOnStones(stones: any[]) {

    for (let i = stones.length - 1; i >= 0; i--) {
        console.log(i)
        // the number of steps we can take from this position
        if (stones[i] == 0 && i !== stones.length - 1) {
            let j = i // 0 position

            for (; j >= 0; j--) {
                if (stones[j] > i - j) {
                    break;
                }
            }

            // no element that could jump far enough was found
            if (j == -1) {
                return false;
            }
            else { 
                i = j + 1
            }
        }
    }

    return true
}
// [1,1,1,1,1]
// [1, 2, 0, 1, 1]
assert.equal(stepOnStones([1,1,1,1,1]), true)
assert.equal(stepOnStones([1,1,1,1,0]), true)
assert.equal(stepOnStones([3, 4, 0, 1, 0]), true)
assert.equal(stepOnStones([3, 4, 0, 1, 0]), true)
assert.equal(stepOnStones([3, 4, 0, 1, 0]), true)
assert.equal(stepOnStones([12,2,0,2,0,2,0,2,0,2,0,0,0,0]), false)
assert.equal(stepOnStones([2,0,0]), true)
assert.equal(stepOnStones([8,0,0]), true)
assert.equal(stepOnStones([0]), true)
//assert.equal([], false)