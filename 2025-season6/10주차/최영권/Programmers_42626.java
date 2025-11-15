package algorithm.LinkedList;

import java.util.PriorityQueue;

/**
 * 시간 복잡도 : O(NlogN)
 */
// https://school.programmers.co.kr/learn/courses/30/lessons/42626?language=java
public class Programmers_42626 {

    public static void main(String[] args) {
        Programmers_42626 p = new Programmers_42626();
        int solution = p.solution(new int[]{1, 2, 3, 9, 10, 12}, 7);
        System.out.println(solution);
    }

    public int solution(int[] scoville, int K) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        int max = -1;
        for (int i : scoville) {
            pq.add(i);
            if (i > max) {
                max = i;
            }
        }
        if (max < 1) {
            return -1;
        }

        int answer = 0;
        while (!pq.isEmpty() && pq.peek() < K && pq.size() >= 2) {
            answer++;
            int i1 = pq.poll();
            int i2 = pq.poll();
            int i3 = i1 + (i2 * 2);
            pq.add(i3);
        }
        if (pq.peek() >= K) {
            return answer;
        }
        return -1;
    }
}
