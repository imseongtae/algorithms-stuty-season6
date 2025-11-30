// 최소 힙(우선순위 큐) 구현
// - 항상 가장 작은 값(루트)을 O(log N)에 꺼낼 수 있게 해주는 자료구조
// - 배열을 사용해서 이진 힙 형식으로 구현
class MinHeap {
    constructor() {
        this.heap = []; // 배열 - 0번 인덱스를 루트로 사용
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    // 힙의 최소값(루트) 조회 (제거 X), 비었으면 null
    peek() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    // 힙에 값 삽입 - 시간 복잡도: O(log N)
    push(value) {
        // 배열 끝에 새 원소를 추가
        this.heap.push(value);

        // 위로 올라가며 정렬
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            // 부모가 더 작거나 같으면 힙 속성 만족 (종료)
            if (this.heap[parentIndex] <= this.heap[index]) break;

            // 그렇지 않으면, 부모와 현재 노드를 교환
            [this.heap[parentIndex], this.heap[index]] = [
                this.heap[index],
                this.heap[parentIndex],
            ];
            index = parentIndex;
        }
    }

    // 힙에서 최소값(루트)을 제거하고 반환 - 시간 복잡도: O(log N)
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        // 루트 값 저장
        const rootValue = this.heap[0];
        // 마지막 원소를 루트 위치로 가져오기
        this.heap[0] = this.heap.pop();

        // 아래로 내려가며 정렬
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let smallest = index;

            // 왼쪽 자식이 존재하고, 현재 노드보다 작으면 최소 인덱스 갱신
            if (left < length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            // 오른쪽 자식이 존재하고, 현재까지의 최소보다 작으면 최소 인덱스 갱신
            if (right < length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            // 더 이상 내려갈 곳이 없으면 종료
            if (smallest === index) break;

            // 현재 노드와 더 작은 자식 노드를 교환
            [this.heap[index], this.heap[smallest]] = [
                this.heap[smallest],
                this.heap[index],
            ];
            index = smallest;
        }

        return rootValue;
    }
}

/**
 * 로직 개요:
 * 1. 모든 스코빌 지수를 최소 힙에 넣는다. (가장 작은 값부터 빠르게 꺼내기 위함)
 * 2. 힙의 최소값이 K 이상일 때까지 반복:
 *    - 힙에서 가장 맵지 않은 음식 두 개를 꺼낸다: a, b
 *    - 새로운 음식의 스코빌: a + (b * 2)
 *    - 이 값을 다시 힙에 넣고, 섞은 횟수를 +1
 * 3. 중간에 힙에 원소가 하나밖에 없는데도 K 미만이면, 더 이상 섞을 수 없으므로 -1 반환
 *
 * 시간 복잡도:
 * - 힙 초기 구성: O(N log N) (N개를 힙에 넣기)
 * - 섞는 연산 M번: O(M log N)
 * 전체: O((N + M) log N)
 *
 * @param {number[]} scoville - 각 음식의 스코빌 지수 배열
 * @param {number} K - 목표 스코빌 지수
 * @returns {number} - 모든 음식의 스코빌이 K 이상이 되도록 섞어야 하는 최소 횟수, 불가능하면 -1
 */
export function solution(scoville, K) {
    const heap = new MinHeap();

    // 1. 모든 스코빌을 힙에 넣기
    for (const s of scoville) {
        heap.push(s);
    }

    let mixCount = 0;

    // 2. 힙의 최소값이 K 이상이 될 때까지 반복
    while (!heap.isEmpty() && heap.peek() < K) {
        // 가장 작은 값이 K보다 작은데,
        // 힙에 원소가 하나뿐이면 더 이상 섞을 수 없음 -> 실패
        if (heap.size() < 2) {
            return -1;
        }

        // 가장 맵지 않은 두 개의 음식 꺼내기
        const first = heap.pop(); // 최소값
        const second = heap.pop(); // 두 번째 최소값

        // 새로운 음식의 스코빌 계산
        const newScoville = first + second * 2;

        // 새 음식 힙에 넣기
        heap.push(newScoville);

        // 섞은 횟수 증가
        mixCount++;
    }

    // 힙이 비어 있지 않고, 최소값이 K 이상이 된 상태라면 성공
    return mixCount;
}
