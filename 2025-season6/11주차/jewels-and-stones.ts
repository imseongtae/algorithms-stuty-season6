/*
771. Jewels and Stones

You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:

Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
Example 2:

Input: jewels = "z", stones = "ZZ"
Output: 0
 

Constraints:

1 <= jewels.length, stones.length <= 50
jewels and stones consist of only English letters.
All the characters of jewels are unique.
*/
// 최종 시간복잡도 O(j) + O(s) (j: jewels.length, s: stones.length)
function numJewelsInStones(jewels: string, stones: string): number {
    // TC: O(j)
    const jewelSets = new Set(jewels)
    let jewelsCount = 0
    // TC: O(s)
    for (let stone of stones) {
        if (jewelSets.has(stone)) {
            jewelsCount++
        }
    }
    return jewelsCount
};