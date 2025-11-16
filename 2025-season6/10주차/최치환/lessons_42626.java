import java.util.PriorityQueue;
// 전체 시간복잡도: O(n log n)
// 전체 공간복잡도: O(n)

class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        // 시간복잡도: O(n)
        for (int s : scoville) {
            pq.offer(s);
        }

        while (pq.size() > 1 && pq.peek() < K) {
            int first = pq.poll();
            int second = pq.poll();
            int mixed = first + (second * 2);
            pq.offer(mixed);
            answer++;
        }

        if (pq.peek() < K) {
            return -1; // O(1), O(1)
        } else {
            return answer; // O(1), O(1)
        }
    }
}
