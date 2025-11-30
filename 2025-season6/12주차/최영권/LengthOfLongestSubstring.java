package algorithm;

import java.util.HashSet;
import java.util.Set;

// 시간복잡도 : O(n)
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
public class LengthOfLongestSubstring {

    public int lengthOfLongestSubstring(String s) {
        int left = 0, right = 0;
        Set<String> set = new HashSet<>();
        int maxLength = 0;
        char[] charArray = s.toCharArray();
        for (int i = 0; i < s.length(); i++) {
            if (!set.contains(charArray[i] + "")) {
                set.add(charArray[i] + "");
                right++;
                maxLength = Math.max(maxLength, (right - left));
            } else {
                while (charArray[left] != charArray[i]) {
                    set.remove(charArray[left] + "");
                    left++;
                }
                set.add(charArray[i] + "");
                left++;
                right++;
                maxLength = Math.max(maxLength, (right - left));
            }

        }
        return maxLength;
    }
}
