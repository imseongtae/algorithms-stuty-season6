class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>(); // TC: O(1), SC: O(n)

        for(int num : nums){ // TC: O(n) 
            map.put(num, map.getOrDefault(num, 0) + 1); // getOrDefault: key가 없으면 0, 있으면 현재 값 반환 TC: O(1) 
        }

        List<Integer> uniqueNumbers = new ArrayList<>(map.keySet()); // HashMap의 모든 키를 리스트로 변환, TC: O(u) - u는 고유 숫자 개수,  SC: O(u)

        // 빈도수 내림차순으로 정렬 (많이 나온 순서)
        uniqueNumbers.sort((a, b) -> map.get(b) - map.get(a));
        
        int[] result = new int[k]; // TC: O(k), SC: O(k)
        for (int i = 0; i < k; i++) {
            result[i] = uniqueNumbers.get(i); // TC: O(1), SC: O(1)
        }
        
        return result;


    }
}

/*
 * === 시간 복잡도 상세 분석 ===
 * 
 * 1. HashMap 생성: O(1)
 * 2. 빈도수 계산: O(n)
 *    - n개 요소 순회
 *    - 각 put/get: O(1)
 * 3. keySet → ArrayList: O(u)
 *    - u개 키 복사
 * 4. 정렬: O(u log u)
 *    - Tim Sort 사용
 *    - 비교 기반 정렬
 * 5. 결과 배열 생성: O(k)
 *    - k번 반복
 * 
 * 전체: O(n) + O(u) + O(u log u) + O(k)
 *     = O(n + u log u)
 *     
 * 최악의 경우 (모든 숫자가 고유):
 * u = n → O(n + n log n) = O(n log n)
 * 
 * === 공간 복잡도 상세 분석 ===
 * 
 * 1. frequencyMap: O(u)
 *    - 최악: u = n → O(n)
 * 2. uniqueNumbers: O(u)
 *    - 최악: u = n → O(n)
 * 3. 정렬 스택: O(log u)
 *    - 재귀 깊이
 * 4. result: O(k)
 *    - k ≤ u ≤ n
 * 
 * 전체: O(u) + O(u) + O(log u) + O(k)
 *     = O(u + log u + k)
 *     = O(u) (u가 지배적)
 *     
 * 최악의 경우: O(n)
 * /



