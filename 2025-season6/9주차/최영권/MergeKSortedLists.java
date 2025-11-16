package LinkedList;

import LinkedList.Node.ListNode;

import java.util.PriorityQueue;

/**
 * 시간복잡도 : O(Nlogk) , N은 전체 노드의 총 개수 , k: 리스트의 개수
 */
public class MergeKSortedLists {
    public static void main(String[] args) {
        ListNode head1 = new ListNode(1, new ListNode(4, new ListNode(5)));
        ListNode head2 = new ListNode(1, new ListNode(3, new ListNode(4)));
        ListNode head3 = new ListNode(2, new ListNode(6));
        ListNode[] lists = new ListNode[]{head1, head2, head3};
        MergeKSortedLists mergeKSortedLists = new MergeKSortedLists();
        ListNode listNode = mergeKSortedLists.mergeKLists(lists);
        System.out.println(listNode);
    }

    public ListNode mergeKLists(ListNode[] lists) {
        int k = lists.length;
        if (k == 0) {
            return null;
        }

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

        // 최소힙에 가장 작은수(맨앞) 들을 넣음
        for (ListNode list : lists) {
            if (list != null) {
                minHeap.add(list);
            }
        }

        ListNode result = new ListNode();
        ListNode first = result;

        // 힙이 비어있지 않으면, 반복하면서 가장 작은수를 빼서 결과 리스트노드에 넣고, 다음 노드를 다시 최소힙에 넣는 형태
        while (!minHeap.isEmpty()) {
            ListNode node = minHeap.poll();
            result.next = node;
            result = result.next;
            if (node.next != null) {
                minHeap.add(node.next);
            }
        }

        return first.next;
    }
}
