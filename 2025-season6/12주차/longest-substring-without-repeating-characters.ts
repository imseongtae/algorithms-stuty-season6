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
function lengthOfLongestSubstring1(s: string): number {
    if (s.length < 1) {
        return 0
    }
    let longestSubstrLength = 1
    // TC: O(n)
    for (let i = 0; i < s.length - 1; i++) {
        let right = i + 1
        const charSet = new Set<string>()
        charSet.add(s[i])

        // TC: O(n)
        while (s[right] && !charSet.has(s[right])) {
            charSet.add(s[right])
            longestSubstrLength = Math.max(right - i + 1, longestSubstrLength)
            right++
        }
    }
    return longestSubstrLength
};

// Sliding Window + Set 방식
// 최종 TC: O(2n) = O(n)
function lengthOfLongestSubstring2(s: string): number {
    const charSet = new Set<string>();
    let left = 0;
    let maxLength = 0;

    // right 포인터를 한 칸씩 전진
    // TC: O(n)
    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // 중복 문자가 있으면 left를 이동하며 제거
        // 예: s = 'abcc'일 때, sliding window [a,b,c]에서 c를 추가하려 할 때 → a 제거, b 제거, c 제거 (left를 a, b, c, c 다음으로 순차적으로 이동)
        while (charSet.has(char)) {
            charSet.delete(s[left]);
            left++;
        }

        // 현재 문자 추가
        charSet.add(char);

        // 최대 길이 갱신
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};

// Sliding Window + Map 방식
// 최종 TC: O(n)
function lengthOfLongestSubstring3(s: string): number {
    const charIndexMap = new Map<string, number>();
    let left = 0;
    let maxLength = 0;

    // TC: O(n)
    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        const charIndex = charIndexMap.get(char);
        // TC: O(1)
        // 중복 발견 시 left를 중복 위치 다음으로 직접 점프
        // 예: s='abcdefghijkk', [a...k]에서 k를 추가할 때 → left를 10→11로 한 번에 이동
        if (charIndex !== undefined && charIndex >= left) {
            left = charIndex + 1;
        }
        charIndexMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};

// 최종 TC: O(n)
function lengthOfLongestSubstring(s: string): number {
    return lengthOfLongestSubstring3(s);
}
