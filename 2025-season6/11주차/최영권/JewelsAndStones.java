package algorithm;

import java.util.HashSet;
import java.util.Set;

// 시간복잡도 : O(n * m), n = stones의 길이,m = jewels의 길이
// https://leetcode.com/problems/jewels-and-stones/description/
public class JewelsAndStones {
    public static void main(String[] args) {
        JewelsAndStones jewelsAndStones = new JewelsAndStones();
        System.out.println(jewelsAndStones.numJewelsInStones("aA", "aAAbbbb"));
    }

    public int numJewelsInStones(String jewels, String stones) {
        int count = 0;
        for (char c : stones.toCharArray()) {
            if (jewels.indexOf(c) != -1) {
                count++;
            }
        }
        return count;
    }
}
