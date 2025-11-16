/**
 * @problemId 42626
 * @origin Programmers
 * @title 더 맵게 (재서술)
 * @summary 여러 음식의 맵기 수치를 나타내는 배열이 주어진다.
 *         모든 음식의 맵기 수치를 목표값 K 이상으로 만들기 위해,
 *         가장 덜 매운 두 음식을 이용해 새로운 음식을 만드는 과정을 반복한다.
 *         새로운 음식의 맵기 수치는 첫 번째 음식의 맵기 +
 *         두 번째 음식의 맵기에 2를 곱한 값이다.
 *         모든 음식이 목표 맵기 이상이 될 때까지 필요한 조합 횟수를 구한다.
 *
 * @inputs
 * - scoville: 각 음식의 맵기 수치를 담은 정수 배열
 * - K: 목표로 하는 최소 맵기 수치
 *
 * @outputs
 * - number: 모든 음식이 K 이상이 될 때까지 수행한 조합 횟수.
 *           더 이상 조합할 수 없는데도 목표를 만족할 수 없다면 -1.
 *
 * @examples
 * - 입력: scoville = [1, 2, 3, 9, 10, 12], K = 7 → 출력: 2
 *
 * @constraints
 * - 2 ≤ scoville.length ≤ 1,000,000
 * - 0 ≤ K ≤ 1,000,000,000
 * - 0 ≤ scoville[i] ≤ 1,000,000
 * - 목표 맵기에 도달할 수 없는 경우 -1 반환
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n log n)
 * 최악의 경우 시간 복잡도: O(n log n)
 * 공간 복잡도: O(n)
 */
function solution(scoville, K) {
    const heap = new MinHeap();

    for (const s of scoville) {
        heap.push(s);
    }

    let mixCount = 0;

    while (heap.size() >= 2 && heap.peek() < K) {
        const first = heap.pop();      // 가장 맵기 낮은 음식
        const second = heap.pop();     // 두 번째로 낮은 음식
        const newFood = first + second * 2;

        heap.push(newFood);
        mixCount++;
    }

    return heap.peek() >= K ? mixCount : -1;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    /**
     * 최소 힙에 값 삽입
     * @param {number} value 삽입할 숫자
     */
    push(value) {
        this.heap.push(value);
        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor((currentIndex - 1) / 2);

        // 부모보다 작으면 swap
        while (currentIndex > 0 && this.heap[currentIndex] < this.heap[parentIndex]) {
            [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
            currentIndex = parentIndex;
            parentIndex = Math.floor((currentIndex - 1) / 2);
        }
    }

    /**
     * 최소값 추출 및 재정렬
     * @returns {number} 최소값
     */
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();

        let currentIndex = 0;
        const length = this.heap.length;

        while (true) {
            let left = currentIndex * 2 + 1;
            let right = currentIndex * 2 + 2;
            let smallest = currentIndex;

            if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

            if (smallest === currentIndex) break;

            [this.heap[currentIndex], this.heap[smallest]] = [this.heap[smallest], this.heap[currentIndex]];
            currentIndex = smallest;
        }

        return min;
    }

    /**
     * 최소값 확인
     * @returns {number}
     */
    peek() {
        return this.heap[0];
    }

    /**
     * 현재 힙 크기 반환
     * @returns {number}
     */
    size() {
        return this.heap.length;
    }
}
