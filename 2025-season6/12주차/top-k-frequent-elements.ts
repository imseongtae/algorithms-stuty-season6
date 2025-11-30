/*
347. Top K Frequent Elements

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2

Output: [1,2]

Example 2:

Input: nums = [1], k = 1

Output: [1]

Example 3:

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

Output: [1,2]

 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/

// 최종 TC: O(n) + O(n) + O(n log n) + O(k) = O(2n) + O(n log n) + O(k) = O(n log n)
function topKFrequent(nums: number[], k: number): number[] {
    const frequentMap = new Map()

    // TC: O(n), SC: O(n)
    nums.forEach(n => frequentMap.set(n, (frequentMap.get(n) || 0) + 1))


    // SC: O(n)
    return Array.from(frequentMap.entries()) // TC: O(n)
        .sort((a, b) => b[1] - a[1]) // TC: O(n log n)
        .slice(0, k)
        .map(a => a[0]) // TC: O(k)
};