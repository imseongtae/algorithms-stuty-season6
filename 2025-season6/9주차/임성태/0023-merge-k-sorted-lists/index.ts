import { ListNode } from './list-node' 

/**
 * @problemId 23
 * @origin LeetCode
 * @title Merge k Sorted Lists
 * @summary 정렬된 단일 연결 리스트들이 들어 있는 배열이 주어진다.
 *          모든 노드를 하나의 정렬된 단일 연결 리스트로 합친 결과를 반환한다.
 *
 * @inputs
 * - lists: ListNode[] 형태의 배열. 각 원소는 오름차순으로 정렬된 단일 연결 리스트의 머리 노드이거나 null
 *
 * @outputs
 * - ListNode | null: 모든 노드를 포함하는 하나의 정렬된 단일 연결 리스트의 머리 노드 (노드가 없으면 null)
 *
 * @examples
 * - 입력: [[1,4,5],[1,3,4],[2,6]] → 출력: [1,1,2,3,4,4,5,6]
 * - 입력: [] → 출력: []
 * - 입력: [[]] → 출력: []
 *
 * @constraints
 * - k = lists.length
 * - 0 ≤ k ≤ 10⁴
 * - 0 ≤ lists[i].length ≤ 500
 * - -10⁴ ≤ 각 노드 값 ≤ 10⁴
 * - lists[i]는 오름차순으로 정렬되어 있음
 * - 모든 lists[i].length의 합은 10⁴을 넘지 않음
 * 
 * Big-O 분석
 * 평균적인 경우 시간 복잡도: O(k·n)
 * 최악의 경우 시간 복잡도: O(k·n)
 * 공간 복잡도: O(1) (추가 메모리 없음)
 * 
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null  

  let merged = null;

  for (let i = 0; i < lists.length; i++) {
    merged = mergeTwoLists(merged, lists[i])
  }

  return merged
};

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode()
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      l1 = l1.next;      
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 || l2;
  return dummy.next;
}
