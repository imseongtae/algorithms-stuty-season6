package LinkedList;

import java.util.Arrays;
import java.util.PriorityQueue;

/**
 * 시간복잡도 : O(NlogN) , N은 점의 총 개수
 */
public class KClosestPointsToOrigin {
    public static void main(String[] args) {
        KClosestPointsToOrigin obj = new KClosestPointsToOrigin();
        int[][] x = obj.kClosest(new int[][]{{1, 3}, {-2, 2}}, 1);
        System.out.println(Arrays.deepToString(x));
    }

    public int[][] kClosest(int[][] points, int k) {
        int[][] result = new int[k][2];
        PriorityQueue<Point> pq = new PriorityQueue<>();
        for (int[] point : points) {
            int x = point[0];
            int y = point[1];
            int abs1 = Math.abs(x);
            int abs2 = Math.abs(y);
            int distance = (abs1 * abs1) + (abs2 * abs2);
            Point point1 = new Point(x, y, distance);
            pq.offer(point1);
        }
        for (int i = 0; i < k; i++) {
            Point poll = pq.poll();
            result[i][0] = poll.x;
            result[i][1] = poll.y;
        }
//        System.out.println(pq);
        return result;
    }

    static class Point implements Comparable<Point> {
        int x;
        int y;
        int distance;

        public Point(int x, int y, int distance) {
            this.x = x;
            this.y = y;
            this.distance = distance;
        }

        @Override
        public int compareTo(Point o) {
            return this.distance - o.distance;
        }
    }
}
