/**
 * @problemId 771
 * @origin LeetCode
 * @title Jewels and Stones
 * @summary 두 개의 문자열이 주어진다. 첫 번째 문자열은 특별한 돌의 종류를 나타내며,
 *          두 번째 문자열은 현재 가지고 있는 돌들을 순서대로 나타낸다.
 *          두 번째 문자열에서 등장하는 각 글자 중,
 *          첫 번째 문자열에 포함된 글자와 동일한 것들의 개수를 구한다.
 *
 * @inputs
 * - jewels: 특별한 돌의 종류를 나타내는 문자열 (각 문자는 모두 서로 다름)
 * - stones: 현재 가지고 있는 돌들을 나열한 문자열
 *
 * @outputs
 * - number: stones 안에서 jewels에 포함된 문자들이 등장한 총 개수
 *
 * @examples
 * - 입력: jewels = "aA", stones = "aAAbbbb" → 출력: 3
 * - 입력: jewels = "z", stones = "ZZ" → 출력: 0
 *
 * @constraints
 * - 1 ≤ jewels.length, stones.length ≤ 50
 * - jewels와 stones는 모두 영어 알파벳으로만 구성됨
 * - jewels의 모든 문자는 서로 다름
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n + m)
 * 최악의 경우 시간 복잡도: O(n + m)
 * 공간 복잡도: O(m)
 */
function numJewelsInStones(jewels: string, stones: string): number {
  // 1. 해시 테이블(집합)을 이용하여 보석 종류를 저장
  const jewelSet = new Set<string>();

  // J 문자열의 각 문자를 집합에 추가
  for (const jewel of jewels) {
    jewelSet.add(jewel); // 여기서 'a'와 'A'를 집합에 추가
  }

  // 2. 보석의 수를 세기 위한 변수 초기화
  let count = 0;

  // 3. 돌 문자열을 순회하면서 보석인지 확인
  for (const stone of stones) {
    // 만약 현재 문자가 보석이라면
    if (jewelSet.has(stone)) {
      count++; // count 증가
    }
  }

  // 4. 총 보석의 수 반환
  return count;
}
