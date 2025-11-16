/**
 * @problemId 706
 * @origin LeetCode
 * @title Design HashMap
 * @summary 비어 있는 구조를 시작점으로 하여, 정수형 키와 값을 보관하고 조회하며
 *          특정 키와 연결된 항목을 제거할 수 있는 자료 구조를 직접 구현하는 문제.
 *
 * @inputs
 * - put(key, value): 지정된 키에 값을 연결한다. 동일한 키가 이미 존재한다면 값을 새로 저장한다.
 * - get(key): 해당 키에 연결된 값을 반환한다. 존재하지 않으면 -1을 반환한다.
 * - remove(key): 해당 키가 존재하면 그 항목을 제거한다.
 *
 * @outputs
 * - 없음: 각 연산은 자료 구조 내부 상태를 변경하거나 조회 결과를 반환한다.
 *
 * @examples
 * - 입력: ["MyHashMap","put","put","get","get","put","get","remove","get"]
 *         [[], [1,1], [2,2], [1], [3], [2,1], [2], [2], [2]]
 *   출력: [null, null, null, 1, -1, null, 1, null, -1]
 *
 * @constraints
 * - 0 ≤ key, value ≤ 10⁶
 * - 최대 10⁴번의 연산이 수행된다.
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(1)
 * 공간 복잡도: O(n)
 */
class MyHashMap {
  private map: number[];

  constructor() {
    // 배열을 초기화할 때 -1로 채워서 존재하지 않는 키를 구분
    this.map = new Array(1_000_001).fill(-1)
  }

  put(key: number, value: number): void {
    this.map[key] = value;
  }

  get(key: number): number {
    return this.map[key];
  }

  remove(key: number): void {
    this.map[key] = -1;
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
