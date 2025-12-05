/**
 * @problemId 347
 * @origin LeetCode
 * @title Top K Frequent Elements
 * @summary 정수 배열과 정수 k가 주어질 때, 배열에서 가장 많이 등장한 값들 중
 *         상위 k개를 반환하는 문제이다. 출력 순서는 임의여도 된다.
 *
 * @inputs
 * - nums: 정수 배열
 * - k: 양의 정수 (가장 자주 등장한 요소의 개수)
 *
 * @outputs
 * - number[]: 등장 빈도가 높은 순서대로 상위 k개의 정수(순서는 임의)
 *
 * @examples
 * - 입력: nums = [1,1,1,2,2,3], k = 2 → 출력: [1,2]
 * - 입력: nums = [1], k = 1 → 출력: [1]
 * - 입력: nums = [1,2,1,2,1,2,3,1,3,2], k = 2 → 출력: [1,2]
 *
 * @constraints
 * - 1 ≤ nums.length ≤ 10⁵
 * - -10⁴ ≤ nums[i] ≤ 10⁴
 * - k는 1 이상이며 배열 내 서로 다른 값의 개수 이하
 * - 결과는 유일하게 결정됨
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n log n)
 * 공간 복잡도: O(n)
 */
function topKFrequent(nums: number[], k: number): number[] {
      // 1. 요소의 빈도 계산을 위한 Map 생성
    const frequencyMap = new Map<number, number>();

    // 배열을 순회하며 빈도 계산
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }
    
    // 빈도 계산 결과 출력 (디버깅용)
    console.log(frequencyMap);

    // 2. 빈도를 기준으로 내림차순 정렬
    const sortedFrequencyArray = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

    // 정렬 결과 출력 (디버깅용)
    console.log(sortedFrequencyArray);

    // 3. 상위 k개의 요소 추출
    const topKFrequentElements = sortedFrequencyArray.slice(0, k).map(entry => entry[0]);

    // 최종 결과 반환
    return topKFrequentElements;
};
