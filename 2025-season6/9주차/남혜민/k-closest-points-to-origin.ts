/**
 * 원점으로부터 가장 가까운 k개의 점을 찾는 함수
 *
 * 시간 복잡도: O(n log n)
 * - map(): O(n) - 모든 점에 대해 거리 계산
 * - sort(): O(n log n) - 정렬
 * - slice(): O(k) - k개 요소 추출
 * - map(): O(k) - point만 추출
 * 전체: O(n) + O(n log n) + O(k) + O(k) = O(n log n)
 *
 * 공간 복잡도: O(n)
 * - map()으로 생성된 새로운 배열: O(n)
 * - 정렬을 위한 추가 공간: O(log n) ~ O(n) (정렬 알고리즘에 따라)
 * 전체: O(n)
 */
function kClosest(points: number[][], k: number): number[][] {
    // 각 점의 거리를 계산하고 정렬
    // 제곱근은 계산할 필요 없음 (비교 시 순서가 동일)
    return points
        .map((point) => ({
            point,
            distance: point[0] ** 2 + point[1] ** 2,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, k)
        .map((item) => item.point);
}
