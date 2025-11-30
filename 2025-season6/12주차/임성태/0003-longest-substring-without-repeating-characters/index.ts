/**
 * @problemId 3
 * @origin LeetCode
 * @title Longest Substring Without Repeating Characters
 * @summary 하나의 문자열이 주어졌을 때, 동일한 문자가 겹치지 않는 연속된 구간 중
 *         가장 길이가 긴 구간의 길이를 구하는 문제이다.
 *
 * @inputs
 * - s: 문자열 (영문자, 숫자, 기호, 공백 포함 가능)
 *
 * @outputs
 * - number: 중복 문자가 없는 가장 긴 연속 부분 문자열의 길이
 *
 * @examples
 * - 입력: "abcabcbb" → 출력: 3
 * - 입력: "bbbbb" → 출력: 1
 * - 입력: "pwwkew" → 출력: 3
 *
 * @constraints
 * - 0 ≤ s.length ≤ 5 * 10⁴
 * - 문자열 s는 영어 알파벳, 숫자, 기호, 공백으로 구성될 수 있음
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n)
 * 공간 복잡도: O(n)
 */
function lengthOfLongestSubstring(s: string): number {
  // 슬라이딩 윈도우의 두 포인터
  let left = 0;
  let right = 0;

  // 가장 긴 부분 문자열의 길이
  let maxLength = 0;

  // 문자의 마지막 인덱스를 저장할 해시맵
  const charIndexMap: { [key: string]: number } = {};

  // 문자열을 끝까지 순회
  while (right < s.length) {
    const currentChar = s[right];

    // 만약 현재 문자가 이미 해시맵에 존재하고, 그것이 left 포인터보다 뒤에 있다면
    if (charIndexMap[currentChar] !== undefined && charIndexMap[currentChar] >= left) {
      // left 포인터를 현재 문자 다음 인덱스로 이동
      left = charIndexMap[currentChar] + 1;
    }

    // 현재 문자의 인덱스를 해시맵에 업데이트
    charIndexMap[currentChar] = right;

    // 현재 윈도우의 길이를 계산하고, 최대 길이를 업데이트
    maxLength = Math.max(maxLength, right - left + 1);

    // right 포인터를 이동
    right++;
  }

  // 가장 긴 부분 문자열의 길이를 반환
  return maxLength;
}
