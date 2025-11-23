class MyHashMap {
    // 해시맵 전용 버킷 배열
    private buckets: [number, number][][]; // 각 인덱스: [key, value]쌍들의 배열
    // 버킷 배열 길이 (해시 테이블 크기)
    private size: number;

    constructor() {
        this.size = 1009; // 적당한 소수를 잡아서 고르게 분포하도록 함. 해시 함수: key % size
        this.buckets = Array.from({ length: this.size }, () => []);
    }

    // 해시 함수
    // 시간복잡도: O(size - 1) => O(1)
    private hash(key: number): number {
        return key % this.size;
    }

    put(key: number, value: number): void {
        const index = this.hash(key);
        const buckets = this.buckets[index];

        // 버킷 내에 key 탐색
        // 최악 시간 복잡도: O(버킷 길이 = 모든 키가 한 버킷에 몰린 경우)
        // 평균 시간 복잡도: O(1)
        for (let i = 0; i < buckets.length; i++) {
            // 같은 key 가 있으면 value 갱신
            if (buckets[i][0] === key) {
                buckets[i][1] = value;
                return;
            }
        }
        // 같은 key가 없으면 새로 삽입
        buckets.push([key, value]);
    }

    get(key: number): number {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // 버킷 내에서 key 탐색
        // 최악 시간 복잡도: O(버킷 길이 = 모든 키가 한 버킷에 몰린 경우)
        // 평균 시간 복잡도: O(1)
        for (const [k, v] of bucket) {
            // 있으면, value 반환
            if (k === key) {
                return v;
            }
        }
        // 없으면 -1 반환
        return -1;
    }

    remove(key: number): void {
        const idx = this.hash(key);
        const bucket = this.buckets[idx];

        // 버킷 내에서 key 탐색
        for (let i = 0; i < bucket.length; i++) {
            // key 있으면,
            if (bucket[i][0] === key) {
                // 배열에서 i 번째 요소 삭제
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

export { MyHashMap };
