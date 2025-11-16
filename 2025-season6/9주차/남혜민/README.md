# 9주차 알고리즘 문제 풀이

## 문제 목록

### 1. Merge K Sorted Lists

-   **파일**: [merge-k-sorted-lists.ts](./merge-k-sorted-lists.ts)
-   **링크**: https://leetcode.com/problems/merge-k-sorted-lists/
-   **난이도**: Hard
-   **요약**: K개의 정렬된 연결 리스트를 하나의 정렬된 리스트로 병합
-   **핵심 아이디어**: 분할 정복으로 리스트를 2개씩 반복적으로 병합 (매 라운드마다 리스트 개수 절반)
-   **시간복잡도**: O(N log K) - N은 총 노드 수, K는 리스트 개수
-   **공간복잡도**: O(1) - 추가 배열만 사용

### 2. K Closest Points to Origin

-   **파일**: [k-closest-points-to-origin.ts](./k-closest-points-to-origin.ts)
-   **링크**: https://leetcode.com/problems/k-closest-points-to-origin/
-   **난이도**: Medium
-   **요약**: 원점으로부터 가장 가까운 k개의 점 찾기
-   **핵심 아이디어**: 거리를 계산하고 정렬하여 k개 추출 (제곱근 계산 생략)
-   **시간복잡도**: O(n log n) - 정렬
-   **공간복잡도**: O(n) - 거리 정보 배열

## 학습 포인트

### Merge K Sorted Lists

-   **분할 정복 (반복)**: K개를 매 라운드마다 2개씩 병합, log K 라운드 반복
-   **두 리스트 병합**: while문으로 두 포인터를 이동하며 작은 값 연결
-   **시간 복잡도**: 각 라운드 O(N), log K 라운드 → O(N log K)

### K Closest Points to Origin

-   **거리 최적화**: √(x² + y²) 대신 x² + y²만 계산 (순서 동일)
-   **정렬 vs 힙**: 정렬 O(n log n), 힙 O(n log k), Quick Select 평균 O(n)
-   **트레이드오프**: 정렬이 가장 간단하고 안정적
