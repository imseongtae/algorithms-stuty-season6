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
function topKFrequent1(nums: number[], k: number): number[] {
    const frequentMap = new Map()

    // TC: O(n), SC: O(n)
    // 빈도수를 map으로 생성
    nums.forEach(n => frequentMap.set(n, (frequentMap.get(n) || 0) + 1))


    // SC: O(n)
    return Array.from(frequentMap.entries()) // TC: O(n)
        .sort((a, b) => b[1] - a[1]) // TC: O(n log n)
        .slice(0, k)
        .map(a => a[0]) // TC: O(k)
};

// 버킷 sort 활용
// 최종 TC: O(n) + O(n) + O(n) + O(n) = O(4n) = O(n)
// 하지만 실제 실행속도는 topKFrequent1
function topKFrequent2(nums: number[], k: number): number[] {
    const frequentMap = new Map()

    // TC: O(n), SC: O(n)
    // 빈도수를 map으로 생성
    nums.forEach(n => frequentMap.set(n, (frequentMap.get(n) || 0) + 1))

    // bucket의 index를 nums의 가능한 모든 빈도수로 생성
    // TC: O(n)
    const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

    // 빈도수를 key로 해당하는 num을 bucket의 배열에 저장
    // TC: O(n)
    for (const [num, freq] of frequentMap.entries()) {
        buckets[freq].push(num)
    }

    // 높은 빈도수부터 k개 선택
    const result: number[] = []
    // TC: O(n)
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        // 빈도가 있는 값만 result에 추가
        if (buckets[i].length > 0) {
            result.push(...buckets[i])
        }
    }

    // 제약조건상에서 정답은 unique하다고 했으므로 그대로 반환. 아니라면 result.slice(0, k)로 한 번더 자르기
    return result
}

function topKFrequent(nums: number[], k: number): number[] {
    return topKFrequent2(nums, k);
}