class Solution {
    // 전체 시간복잡도: O(n log k)  (n = points.size)
    // 전체 공간복잡도: O(k)
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        if (k == points.size) return points

        // java.util.PriorityQueue를 풀 네임으로 사용하여 import 충돌 회피
        val pq = java.util.PriorityQueue<IntArray>(Comparator { a, b ->
            val da = a[0] * a[0] + a[1] * a[1]
            val db = b[0] * b[0] + b[1] * b[1]
            // db - da 순으로 정렬 -> 최대 힙처럼 동작 (거리가 큰 것이 우선)
            db.compareTo(da)
        })

        // n개의 점을 보며 최대 k개만 유지: O(n log k)
        for (p in points) {
            pq.offer(p)
            if (pq.size > k) pq.poll() // 가장 먼 점 제거: O(log k)
        }

        // 결과 구성: O(k)
        val res = Array(k) { IntArray(2) }
        var idx = 0
        while (idx < k) {
            val arr = pq.poll()
            // poll()은 null 가능성이 있으나 pq.size == k 보장하므로 안전
            res[idx++] = arr
        }
        return res
    }
}
