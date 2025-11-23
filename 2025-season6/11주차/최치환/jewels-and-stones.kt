class Solution {
    // 전체 시간복잡도: O(n + m)
    // 전체 공간복잡도: O(m)
    fun numJewelsInStones(jewels: String, stones: String): Int {
        val jewelSet = jewels.toSet()
        var count = 0
        // 시간복잡도: O(n)
        for (stone in stones) { // O(n), O(1)
            if (jewelSet.contains(stone)) { 
                count++
            }
        }
        return count

    }
}
