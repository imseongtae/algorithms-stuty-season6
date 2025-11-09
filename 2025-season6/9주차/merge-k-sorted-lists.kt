class Solution {
    // 전체 시간복잡도: O(N log k)
    // 전체 공간복잡도: O(k)
    fun mergeKLists(lists: Array<ListNode?>): ListNode? {
        // 우선순위 큐 초기화 - O(k)
        val pq = PriorityQueue<ListNode>(compareBy { it.`val` })
        for (node in lists) {
            if (node != null) pq.add(node) // O(log k)
        }

        // dummy 노드로 결과 리스트 구성 - O(1)
        val dummy = ListNode(0)
        var tail = dummy

        // 큐가 빌 때까지 최소 노드를 꺼내며 병합 - O(N log k)
        while (pq.isNotEmpty()) {
            val minNode = pq.poll() // O(log k)
            tail.next = minNode
            tail = tail.next!!
            if (minNode.next != null) pq.add(minNode.next) // O(log k)
        }

        // 결과 반환 - O(1)
        return dummy.next
    }
}
