import java.util.PriorityQueue;

class Solution {
    public int solution(int[] scoville, int K) {
        // 최소 힙 생성 (작은 값이 우선)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // SC: O(n)
        
        // 모든 스코빌 지수를 힙에 추가
        for(int s : scoville) { // TC: O(n)
            minHeap.offer(s); // TC: O(log n)
        }
        
        int answer = 0; // 섞은 횟수
        
        // 가장 작은 값이 K 이상이 될 때까지 반복
        while(minHeap.peek() < K) { // TC: O(n) - 최악 n번 반복
            // 음식이 1개만 남았는데 K 미만이면 불가능
            if(minHeap.size() < 2) { // TC: O(1)
                return -1;
            }
            
            // 가장 맵지 않은 음식
            int first = minHeap.poll(); // TC: O(log n)
            // 두 번째로 맵지 않은 음식
            int second = minHeap.poll(); // TC: O(log n)
            
            // 섞은 음식의 스코빌 지수
            int mixed = first + (second * 2); // TC: O(1)
            
            // 힙에 다시 추가
            minHeap.offer(mixed); // TC: O(log n)
            
            answer++; // 섞은 횟수 증가
        }
        
        return answer;
    }
}

/*
시간 복잡도 
1. 초기 힙 구성
   - for 루프: n번 반복
   - 각 offer(): O(log n)
   - 총: O(n log n)

2. while 루프 (메인 로직)
   - 최악의 경우: n-1번 반복
   
   - 각 반복:
     * peek(): O(1)
     * poll() × 2: O(log n) × 2
     * 계산: O(1)
     * offer(): O(log n)
     → 각 반복: O(log n)
   
   - 총: O(n log n)

최종 TC: O(n log n)

공간 복잡도 

- minHeap: 최대 n개 원소 → O(n)
- 기타 변수들: O(1)

최종 SC: O(n)

*/
