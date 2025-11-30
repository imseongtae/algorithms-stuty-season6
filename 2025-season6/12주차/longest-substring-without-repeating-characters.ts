/*
3. Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without duplicate characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/
// 최종 TC: O(n^2)
function lengthOfLongestSubstring(s: string): number {
    if (s.length < 1) {
        return 0
    }
    let longestSubstrLength = 1
    // TC: O(n)
    for (let i = 0; i < s.length - 1; i++) {
        let right = i + 1
        const set = new Set<string>()
        set.add(s[i])

        // TC: O(n)
        while (s[right] && !set.has(s[right])) {
            set.add(s[right])
            longestSubstrLength = Math.max(right - i + 1, longestSubstrLength)
            right++
        }
    }
    return longestSubstrLength
};
