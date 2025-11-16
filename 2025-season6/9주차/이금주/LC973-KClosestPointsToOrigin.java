class Solution {
  // 방법 1: 정렬 사용 
    public int[][] kClosest(int[][] points, int k) {
         // 거리 기준으로 정렬
        Arrays.sort(points, (a, b) -> { // TC: O(n log n), SC: O(log n)
            int distA = a[0] * a[0] + a[1] * a[1]; // TC: O(1)
            int distB = b[0] * b[0] + b[1] * b[1]; // TC: O(1)
            return distA - distB; // TC: O(1)
        });
        
        // 앞에서 k개만 복사하여 반환
        return Arrays.copyOfRange(points, 0, k); // TC: O(k), SC: O(k)
    }
}
/*
최종 복잡도 정리

정렬 방식 (kClosestSorting)
시간복잡도 (TC):
- Arrays.sort(): O(n log n)
  * Comparator 함수 호출: n log n번
  * 각 비교마다:
    - a[0] * a[0] + a[1] * a[1]: O(1)
    - b[0] * b[0] + b[1] * b[1]: O(1)
    - 비교 연산: O(1)
  → 전체 = O(n log n) × O(1) = O(n log n)
- Arrays.copyOfRange(): O(k)
- return: O(1)
- 전체 시간복잡도: O(n log n) + O(k) + O(1) → 최종: O(n log n)

공간복잡도 (SC):
- 정렬 재귀 스택: O(log n)
- 결과 배열: O(k)
- Comparator 임시 변수 (distA, distB): O(1)
- 전체 공간복잡도: O(log n) + O(k) + O(1) → 최종: O(log n + k)
*/

