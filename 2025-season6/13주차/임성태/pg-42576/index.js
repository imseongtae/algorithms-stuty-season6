/**
 * @problemId 42576
 * @origin Programmers
 * @title 완주하지 못한 선수
 * @summary 마라톤 참가자의 이름 목록 participant와,
 *          그중 완주한 사람들의 이름 목록 completion이 주어진다.
 *          참가자 중 단 한 명은 결승선을 통과하지 못했으며,
 *          그 사람의 이름을 찾아 반환하는 문제이다.
 *
 * @inputs
 * - participant: 마라톤에 참여한 사람들의 이름 배열
 * - completion: 완주한 사람들의 이름 배열 (길이는 participant보다 1 작음)
 *
 * @outputs
 * - string: 완주하지 못한 참가자의 이름
 *
 * @examples
 * - 입력:
 *     participant = ["leo", "kiki", "eden"]
 *     completion = ["eden", "kiki"]
 *   출력: "leo"
 *
 * - 입력:
 *     participant = ["marina", "josipa", "nikola", "vinko", "filipa"]
 *     completion = ["josipa", "filipa", "marina", "nikola"]
 *   출력: "vinko"
 *
 * - 입력:
 *     participant = ["mislav", "stanko", "mislav", "ana"]
 *     completion = ["stanko", "ana", "mislav"]
 *   출력: "mislav"
 *
 * @constraints
 * - 참가자 수는 1 이상 100,000 이하
 * - completion 배열의 길이는 participant보다 정확히 1 작음
 * - 이름은 1~20자의 소문자 알파벳 문자열
 * - 중복된 이름이 포함될 수 있음
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(n), 세 번의 선형 순회 (participant, completion, map)
 * 공간 복잡도: O(n), 모든 참가자를 Map에 저장할 수 있음
 */
function solution(participant, completion) {
      // 참가자와 완주자 배열이 주어집니다.
  const participantMap = new Map();

  // 모든 참가자를 해시 맵에 추가합니다.
  for (const person of participant) {
    // 참가자 이름을 키로, 횟수를 값으로 저장합니다.
    participantMap.set(person, (participantMap.get(person) || 0) + 1);
    // 만약 참가자가 해시 맵에 없으면, 0을 반환하고, 있으면 해당 값에 1을 더합니다.
  }

  // 모든 완주자를 해시 맵에서 제거합니다.
  for (const person of completion) {
    // 참가자 이름을 키로 찾아서 값을 감소시킵니다.
    if (participantMap.has(person)) {
      participantMap.set(person, participantMap.get(person) - 1);
      // 완주자를 해시 맵에서 하나씩 제거합니다.
    }
  }

  // 남아있는 키 값 중 값이 1인 키를 찾아냅니다.
  for (const [key, value] of participantMap) {
    if (value > 0) {
      return key; // 완주하지 못한 참가자 반환
    }
  }
}