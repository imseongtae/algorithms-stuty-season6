/*
706. Design HashMap
Easy
Topics
premium lock icon
Companies
Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 

Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
 

Constraints:

0 <= key, value <= 10^6
At most 10^4 calls will be made to put, get, and remove.
*/

/**
 * 최적화된 HashMap 구현
 *
 * 전략:
 * - Separate Chaining: 각 버킷에 [key, value] 쌍의 배열을 저장
 * - 버킷 크기: 1009 (소수를 사용하여 해시 충돌 최소화)
 * - 해시 함수: key % bucketSize
 *
 * 시간 복잡도:
 * - put: 평균 O(1), 최악 O(n/k) where k = bucketSize
 * - get: 평균 O(1), 최악 O(n/k)
 * - remove: 평균 O(1), 최악 O(n/k)
 *
 * 공간 복잡도: O(k + n) where k = bucketSize, n = 엔트리 개수
 */
class MyHashMap {
    private readonly buckets: Array<Array<[number, number]>>;
    private readonly bucketSize: number;

    constructor() {
        // 소수를 사용하여 해시 충돌 최소화 (1009는 1000에 가까운 소수)
        this.bucketSize = 1009;
        this.buckets = Array.from({ length: this.bucketSize }, () => []);
    }

    /**
     * 해시 함수: key를 버킷 인덱스로 변환
     */
    private hash(key: number): number {
        return key % this.bucketSize;
    }

    /**
     * (key, value) 쌍을 HashMap에 삽입하거나 업데이트
     * 시간 복잡도: 평균 O(1)
     */
    put(key: number, value: number): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // 이미 존재하는 key인지 확인하고 업데이트
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        // 새로운 key-value 쌍 추가
        bucket.push([key, value]);
    }

    /**
     * key에 매핑된 value를 반환, 없으면 -1 반환
     * 시간 복잡도: 평균 O(1)
     */
    get(key: number): number {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }

        return -1;
    }

    /**
     * key와 해당 value를 제거
     * 시간 복잡도: 평균 O(1)
     */
    remove(key: number): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

/**
 * 사용 예시:
 * const myHashMap = new MyHashMap();
 * myHashMap.put(1, 1);
 * myHashMap.put(2, 2);
 * myHashMap.get(1);    // returns 1
 * myHashMap.get(3);    // returns -1
 * myHashMap.put(2, 1); // update the existing value
 * myHashMap.get(2);    // returns 1
 * myHashMap.remove(2); // remove the mapping for 2
 * myHashMap.get(2);    // returns -1
 */

// ============================================================================
// 제약조건 기반 최적화 버전
// ============================================================================

/**
 * MyHashMap2 - Direct Addressing (최고 성능)
 *
 * 제약조건 활용:
 * - key 범위가 0~10^6으로 제한되어 있음
 * - 배열 인덱스로 key를 직접 사용 (해시 함수 불필요)
 * - 해시 충돌이 완전히 제거됨
 *
 * 시간 복잡도:
 * - put: O(1) - 보장됨
 * - get: O(1) - 보장됨
 * - remove: O(1) - 보장됨
 *
 * 공간 복잡도: O(10^6) = O(1) - 상수 공간
 *
 * 장점:
 * - 가장 빠른 성능 (해시 계산, 충돌 처리 불필요)
 * - 코드가 간단하고 이해하기 쉬움
 * - 모든 연산이 진짜 O(1) 보장
 *
 * 단점:
 * - 고정 메모리 사용 (~4MB for 10^6 integers)
 * - 대부분의 공간이 낭비될 수 있음 (최대 10^4번 호출)
 *
 * 적합한 경우:
 * - 성능이 가장 중요한 경우
 * - 메모리가 충분한 경우
 * - 코딩 테스트에서 최고 속도가 필요한 경우
 */
class MyHashMap2 {
    private readonly data: Int32Array;
    private readonly EMPTY = -1;

    constructor() {
        // Int32Array 사용으로 메모리 효율성 향상 (일반 배열보다 작음)
        // 10^6 + 1 크기의 배열, -1로 초기화 (값이 없음을 표시)
        this.data = new Int32Array(1000001).fill(this.EMPTY);
    }

    /**
     * key를 배열 인덱스로 직접 사용하여 value 저장
     * O(1) - 보장
     */
    put(key: number, value: number): void {
        this.data[key] = value;
    }

    /**
     * key를 배열 인덱스로 직접 사용하여 value 조회
     * O(1) - 보장
     */
    get(key: number): number {
        return this.data[key];
    }

    /**
     * key 위치를 -1로 설정하여 제거
     * O(1) - 보장
     */
    remove(key: number): void {
        this.data[key] = this.EMPTY;
    }
}

/**
 * MyHashMap3 - Two-level Hashing (공간 효율)
 *
 * 제약조건 활용:
 * - key를 두 레벨로 분할: [key / 1000][key % 1000]
 * - Lazy initialization: 필요한 버킷만 생성
 * - 해시 충돌 완전 제거 (각 key는 고유한 위치를 가짐)
 *
 * 시간 복잡도:
 * - put: O(1) - 보장됨
 * - get: O(1) - 보장됨
 * - remove: O(1) - 보장됨
 *
 * 공간 복잡도: O(n) where n = 실제 저장된 키 개수
 *
 * 장점:
 * - 메모리 효율적 (실제 사용한 만큼만 할당)
 * - 여전히 O(1) 보장 (해시 충돌 없음)
 * - 최대 10^4번 호출에 최적화
 *
 * 단점:
 * - Direct addressing보다 약간 느림 (배열 생성 오버헤드)
 * - 코드가 약간 복잡함
 *
 * 적합한 경우:
 * - 메모리 효율이 중요한 경우
 * - 실제 사용되는 키가 적은 경우
 * - 프로덕션 환경에서 실용적인 솔루션이 필요한 경우
 */
class MyHashMap3 {
    private readonly buckets: (Int32Array | null)[];
    private readonly BUCKET_SIZE = 1000;
    private readonly NUM_BUCKETS = 1001; // 0 ~ 1000
    private readonly EMPTY = -1;

    constructor() {
        // 첫 번째 레벨만 초기화 (null로 채움)
        this.buckets = new Array(this.NUM_BUCKETS).fill(null);
    }

    /**
     * key를 두 레벨로 분할하여 인덱스 계산
     * - bucket: key의 천의 자리 (key / 1000)
     * - index: key의 나머지 (key % 1000)
     */
    private getIndices(key: number): [number, number] {
        const bucket = Math.floor(key / this.BUCKET_SIZE);
        const index = key % this.BUCKET_SIZE;
        return [bucket, index];
    }

    /**
     * 필요한 버킷을 lazy하게 생성
     */
    private ensureBucket(bucket: number): void {
        if (this.buckets[bucket] === null) {
            this.buckets[bucket] = new Int32Array(this.BUCKET_SIZE).fill(
                this.EMPTY
            );
        }
    }

    /**
     * O(1) - 보장 (최악의 경우 버킷 생성 포함)
     */
    put(key: number, value: number): void {
        const [bucket, index] = this.getIndices(key);
        this.ensureBucket(bucket);
        this.buckets[bucket]![index] = value;
    }

    /**
     * O(1) - 보장
     */
    get(key: number): number {
        const [bucket, index] = this.getIndices(key);
        if (this.buckets[bucket] === null) {
            return this.EMPTY;
        }
        return this.buckets[bucket]![index];
    }

    /**
     * O(1) - 보장
     */
    remove(key: number): void {
        const [bucket, index] = this.getIndices(key);
        if (this.buckets[bucket] !== null) {
            this.buckets[bucket]![index] = this.EMPTY;
        }
    }
}

/**
 * 성능 비교:
 *
 * 1. MyHashMap (Separate Chaining)
 *    - 시간: 평균 O(1), 최악 O(n/k)
 *    - 공간: O(k + n) where k=1009, n=저장된 엔트리
 *    - 장점: 전통적이고 검증된 방법, 범용적
 *    - 단점: 해시 충돌 가능, 약간 느림
 *
 * 2. MyHashMap2 (Direct Addressing) ⚡ 최고 성능
 *    - 시간: O(1) 보장
 *    - 공간: O(10^6) 고정
 *    - 장점: 가장 빠름, 간단함
 *    - 단점: 메모리 고정 사용
 *    - 추천: 코딩 테스트에서 최고 속도 필요 시
 *
 * 3. MyHashMap3 (Two-level Hashing) ⚖️ 균형잡힌 선택
 *    - 시간: O(1) 보장
 *    - 공간: O(n) 실제 사용량에 비례
 *    - 장점: 메모리 효율적, 여전히 빠름
 *    - 단점: 구현 복잡도 약간 증가
 *    - 추천: 실무나 메모리가 제한된 환경
 *
 * 제약조건(key <= 10^6, 최대 10^4 호출) 활용 시:
 * - 코딩 테스트: MyHashMap2 추천 (최고 속도)
 * - 실무: MyHashMap3 추천 (메모리 효율)
 */