class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> charIndexMap = new HashMap<>(); // TC: O(1), SC: O(min(m, n)) 

        int maxLength = 0; //최대 부분 문자열 길이 TC: O(1), SC: O(1)
        int left = 0; //윈도우의 왼쪽 포인터 TC: O(1), SC: O(1)
         
        for(int right = 0; right < s.length(); right++){ // TC: O(n) - 문자열 전체를 한 번 순회
            char currentChar = s.charAt(right); // TC: O(1) 

            // 현재 문자가 윈도우 내에 이미 존재하는지 확인
            if (charIndexMap.containsKey(currentChar)) {
                 // left를 중복 문자의 다음 위치로 이동하며, Math.max를 사용하는 이유는 left 가 뒤로 가면 안되기 때문
                left = Math.max(left, charIndexMap.get(currentChar) + 1);  // TC: O(1)
            }

            charIndexMap.put(currentChar, right); // 현재 문자의 위치를 저장/업데이트 TC: O(1),  SC: O(1)

             maxLength = Math.max(maxLength, right - left + 1); // 현재 윈도우 크기와 최대 길이 비교, TC: O(1)
        }
        return maxLength; // TC: O(1) - 반환
    }
}

/*
 * ===== 시간복잡도 상세 분석 =====
 * 
 * - 외부 루프: O(n) - right 포인터가 0부터 n-1까지
 * - HashMap 연산: O(1) - containsKey, get, put 모두 평균 O(1)
 * - left 이동: O(1) - Math.max 연산
 * - 총 시간복잡도: O(n)
 * 
 * 주의: left도 최대 n번 이동하지만, right와 left 모두 한 방향으로만
 *       이동하므로 전체적으로 O(n)
 * 
 * ===== 공간복잡도 상세 분석 =====
 * 
 * - HashMap 크기: O(min(m, n))
 *   - m: 문자 집합 크기 (예: ASCII 128, Unicode 수십만)
 *   - n: 문자열 길이
 *   - 실제로는 고유 문자 개수만큼만 저장
 * 
 * - 예:
 *   - "abcabcbb" → map에는 {a, b, c} 3개만 저장 → O(3)
 *   - "aaaaaaa" → map에는 {a} 1개만 저장 → O(1)
 * 
 * 
 * ===== 최적화 팁 =====
 * 
 * - ASCII만 다룬다면 int[128] 배열 사용 가능 → 더 빠름
 * - Set<Character> 사용 시 left를 하나씩 이동해야 함 → O(n²) 가능
 * - HashMap이 가장 범용적이고 효율적
 */
