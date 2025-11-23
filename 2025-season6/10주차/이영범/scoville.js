/**
 * 프로그래머스 - 더 맵게
 *
 * [문제 설명]
 * - 모든 음식의 스코빌 지수를 K 이상으로 만들어야 함
 * - 가장 맵지 않은 음식 두 개를 섞어서 새로운 음식을 만듦
 * - 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식 + (두 번째로 맵지 않은 음식 × 2)
 *
 * [제약 조건]
 * - scoville 배열 길이: 2 ~ 1,000,000
 * - K: 0 ~ 1,000,000,000
 * - 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우 -1 반환
 *
 * [시간 복잡도] O(N log N)
 * - 힙 구성: O(N log N)
 * - 각 섞기 연산: O(log N) × 최대 N번 = O(N log N)
 *
 * [공간 복잡도] O(N)
 */

/**
 * 최소 힙(Min Heap) 자료구조
 * - 완전 이진 트리 구조
 * - 부모 노드가 항상 자식 노드보다 작거나 같음
 * - 루트 노드가 항상 최솟값
 */
class MinHeap {
    constructor() {
        this.heap = []; // 힙을 배열로 표현
    }

    /**
     * 힙의 크기 반환
     */
    size() {
        return this.heap.length;
    }

    /**
     * 최솟값(루트 노드) 조회 (제거하지 않음)
     * 시간 복잡도: O(1)
     */
    peek() {
        return this.heap[0];
    }

    /**
     * 힙에 새로운 값 추가
     * 시간 복잡도: O(log N)
     *
     * 동작 과정:
     * 1. 배열의 맨 끝에 값 추가
     * 2. bubbleUp을 통해 올바른 위치로 이동
     */
    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    /**
     * 최솟값(루트 노드) 제거 및 반환
     * 시간 복잡도: O(log N)
     *
     * 동작 과정:
     * 1. 루트 노드(최솟값)를 저장
     * 2. 마지막 노드를 루트로 이동
     * 3. bubbleDown을 통해 올바른 위치로 이동
     * 4. 저장한 최솟값 반환
     */
    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const min = this.heap[0];           // 최솟값 저장
        this.heap[0] = this.heap.pop();     // 마지막 노드를 루트로 이동
        this.bubbleDown();                  // 힙 속성 복구
        return min;
    }

    /**
     * 새로 추가된 노드를 올바른 위치로 상향 이동
     * 시간 복잡도: O(log N)
     *
     * 동작 과정:
     * 1. 현재 노드와 부모 노드 비교
     * 2. 현재 노드가 더 작으면 부모와 교환
     * 3. 루트에 도달하거나 부모보다 크거나 같을 때까지 반복
     *
     * 배열 인덱스 관계:
     * - 부모 인덱스 = Math.floor((자식 인덱스 - 1) / 2)
     * - 왼쪽 자식 = 부모 × 2 + 1
     * - 오른쪽 자식 = 부모 × 2 + 2
     */
    bubbleUp() {
        let index = this.size() - 1;  // 마지막에 추가된 노드의 인덱스

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);  // 부모 노드 인덱스 계산

            // 부모가 더 작거나 같으면 힙 속성 만족 → 종료
            if (this.heap[parentIndex] <= this.heap[index]) break;

            // 부모와 현재 노드 교환
            [this.heap[parentIndex], this.heap[index]] =
                [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;  // 부모 위치로 이동하여 계속 비교
        }
    }

    /**
     * 루트 노드를 올바른 위치로 하향 이동
     * 시간 복잡도: O(log N)
     *
     * 동작 과정:
     * 1. 현재 노드와 자식 노드들 비교
     * 2. 자식 노드 중 더 작은 값과 비교
     * 3. 현재 노드가 더 크면 자식과 교환
     * 4. 리프 노드에 도달하거나 자식보다 작거나 같을 때까지 반복
     */
    bubbleDown() {
        let index = 0;  // 루트 노드부터 시작

        // 왼쪽 자식이 존재하는 동안 반복
        while (index * 2 + 1 < this.size()) {
            let smallerChildIndex = index * 2 + 1;      // 왼쪽 자식 인덱스
            const rightChildIndex = index * 2 + 2;      // 오른쪽 자식 인덱스

            // 오른쪽 자식이 존재하고 왼쪽 자식보다 작으면 오른쪽 자식 선택
            if (rightChildIndex < this.size() &&
                this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
                smallerChildIndex = rightChildIndex;
            }

            // 현재 노드가 더 작은 자식보다 작거나 같으면 힙 속성 만족 → 종료
            if (this.heap[index] <= this.heap[smallerChildIndex]) break;

            // 현재 노드와 더 작은 자식 교환
            [this.heap[index], this.heap[smallerChildIndex]] =
                [this.heap[smallerChildIndex], this.heap[index]];

            index = smallerChildIndex;  // 자식 위치로 이동하여 계속 비교
        }
    }
}

/**
 * 핵심사항
 * 1. 항상 가장 작은 두 값을 찾아야 함 → 최소 힙 사용
 * 2. 가장 작은 값이 K 이상이 될 때까지 반복
 * 3. 섞은 결과를 다시 힙에 추가
 *
 * 힙의 사용이유
 * - 매번 정렬: O(N² log N) → 매우 비효율적
 * - 힙 사용: O(N log N) → 효율적
 * - 힙은 최솟값 찾기/추가/삭제를 O(log N)에 수행
 * 
 * 전체 시간 복잡도: O(n log n). n은 scoville.length
 */
function solution(scoville, K) {
    const minHeap = new MinHeap();

    // 1단계: 모든 스코빌 지수를 힙에 추가
    // 시간 복잡도: O(N log N)
    for (const s of scoville) {
        minHeap.push(s);
    }

    let mixCount = 0;  // 섞은 횟수

    // 2단계: 가장 작은 값이 K 이상이 될 때까지 반복
    // - 최소 2개의 음식이 필요함 (섞기 위해)
    // - 가장 작은 값이 K 미만인 동안 계속 섞음
    while (minHeap.size() >= 2 && minHeap.peek() < K) {
        const first = minHeap.pop();   // 가장 맵지 않은 음식 (최솟값)
        const second = minHeap.pop();  // 두 번째로 맵지 않은 음식

        // 새로운 음식의 스코빌 지수 계산
        const mixed = first + (second * 2);

        // 새로운 음식을 힙에 추가
        minHeap.push(mixed);
        mixCount++;
    }

    // 3단계: 결과 반환
    // - 가장 작은 값이 K 이상이면 성공 → 섞은 횟수 반환
    // - 그렇지 않으면 불가능 → -1 반환
    // (음식이 1개만 남았는데 K 미만인 경우)
    return minHeap.peek() >= K ? mixCount : -1;
}
