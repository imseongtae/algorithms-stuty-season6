/**
 * @problemId 973
 * @origin LeetCode
 * @title K Closest Points to Origin
 * @summary 2차원 평면 위의 여러 점과 정수 k가 주어진다.
 *         각 점은 (x, y) 좌표로 표현된다.
 *         원점 (0, 0)으로부터 거리가 가까운 k개의 점을 찾아 반환한다.
 *         반환 순서는 임의로 해도 된다.
 *
 * @inputs
 * - points: [x, y] 형태의 정수 쌍 배열
 * - k: 선택할 점의 개수
 *
 * @outputs
 * - number[][]: 원점으로부터 거리가 가까운 k개의 점 목록
 *
 * @examples
 * - 입력: points = [[1, 3], [-2, 2]], k = 1 → 출력: [[-2, 2]]
 * - 입력: points = [[3, 3], [5, -1], [-2, 4]], k = 2 → 출력: [[3, 3], [-2, 4]]
 *
 * @constraints
 * - 1 ≤ k ≤ points.length ≤ 10⁴
 * - -10⁴ ≤ xi, yi ≤ 10⁴
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n)
 * 최악의 경우 시간 복잡도: O(n²)
 * 공간 복잡도: O(log n)
 * 
 */
function kClosest(points: number[][], k: number): number[][] {
    const distance = (point: number[]) => point[0] * point[0] + point[1] * point[1];

    const partition = (left: number, right: number, pivotIndex: number): number => {
        const pivotDistance = distance(points[pivotIndex]);
        [points[pivotIndex], points[right]] = [points[right], points[pivotIndex]];
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (distance(points[i]) < pivotDistance) {
                [points[storeIndex], points[i]] = [points[i], points[storeIndex]];
                storeIndex++;
            }
        }
        [points[right], points[storeIndex]] = [points[storeIndex], points[right]];
        return storeIndex;
    };

    // Quickselect 재귀 함수
    // 평균 O(n), 최악 O(n²)
    const quickSelect = (left: number, right: number, k: number) => {
        if (left >= right) return;

        // pivot 선택 (랜덤) → O(1)
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        // partition 호출 → 평균 O(n)
        const finalPivotIndex = partition(left, right, pivotIndex);

        if (finalPivotIndex === k) return;
        else if (finalPivotIndex < k) quickSelect(finalPivotIndex + 1, right, k);
        else quickSelect(left, finalPivotIndex - 1, k);
    };

    quickSelect(0, points.length - 1, k);

    // 상위 k개의 점만 슬라이스 → O(k)
    return points.slice(0, k);
}
