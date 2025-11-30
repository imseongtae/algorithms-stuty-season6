class Solution {
        Set<Character> jewelSet = new HashSet<>(); //TC: O(1), SC: O(n)
        
        for (char c : jewels.toCharArray()) { // TC: O(n) - jewels 문자열 순회
            jewelSet.add(c); // TC: O(1)
        }
        
        int count = 0; // TC: O(1), SC: O(1) 
        
        
        for (char c : stones.toCharArray()) { // TC: O(m) - stones 문자열 순회
            if (jewelSet.contains(c)) { //TC: O(1)
                count++;  // TC: O(1)
            }
        }
        
        return count; // TC: O(1)
    }
}

/*
 * === 풀이 전략 ===
1. jewels의 각 문자를 HashSet에 저장 (빠른 조회를 위해)
2. stones의 각 문자를 순회하면서 jewel_set에 있는지 확인
3. 있으면 count 증가
 
=== 시간복잡도  ===
- jewels 순회: O(n)
- stones 순회: O(m)
- 각 contains 연산: O(1)
- 총: O(n + m)

=== 공간복잡도 ===
- HashSet 저장: O(n) (최대 jewels 길이)
- count 변수: O(1)
- 총: O(n)

=== 왜 HashSet을 사용하나? ===
- List나 String에서 조회하면 O(n)
- HashSet에서 조회하면 O(1)
- stones가 길수록 차이가 크다
 */
