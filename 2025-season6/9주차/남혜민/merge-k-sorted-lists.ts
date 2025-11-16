import { ListNode } from './list-node';

// 두 개의 정렬된 링크드 리스트를 병합
// 시간 복잡도: O(n + m) - n, m은 각 리스트의 길이
function mergeTwoLists(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    const dummy = new ListNode();
    let current = dummy;

    // O(n + m): 두 리스트를 한 번씩 순회
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    // 남은 노드 연결 - O(1)
    current.next = l1 || l2;

    return dummy.next;
}

/**
 * 방법 1: 순차 병합
 * 시간 복잡도: O(kN)
 * - k: 리스트 개수
 * - N: 전체 노드 개수
 * - 첫 번째 리스트의 노드가 k-1번 비교됨
 *
 * 공간 복잡도: O(1) - 추가 공간 사용 안 함
 */
export function mergeKListsSequential(
    lists: Array<ListNode | null>
): ListNode | null {
    if (!lists || lists.length === 0) return null;

    // 첫 번째 리스트부터 순차적으로 병합
    let result: ListNode | null = lists[0];

    // O(k) 반복
    for (let i = 1; i < lists.length; i++) {
        // 매 반복마다 result 크기가 증가
        // 첫 번째: O(N/k + N/k) = O(2N/k)
        // 두 번째: O(2N/k + N/k) = O(3N/k)
        // ...
        // k-1번째: O((k-1)N/k + N/k) = O(N)
        // 총합: O(N * (1 + 2 + ... + k) / k) = O(kN)
        result = mergeTwoLists(result, lists[i]);
    }

    return result;
}

/**
 * 방법 2: Divide & Conquer (분할 정복)
 * 시간 복잡도: O(N log k)
 * - log k: 병합 라운드 수 (매번 리스트 개수가 절반으로)
 * - N: 각 라운드마다 전체 노드 처리
 *
 * 공간 복잡도: O(1) - 재귀 스택 제외
 */
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (!lists || lists.length === 0) return null;

    // O(log k) 라운드: 매번 리스트 개수가 절반으로 줄어듦
    while (lists.length > 1) {
        const merged: Array<ListNode | null> = [];

        // O(k/2) 반복: 두 개씩 쌍으로 병합
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;

            // 각 병합은 O(N/k): 해당 두 리스트의 노드 수
            // k/2개 쌍을 병합하므로 한 라운드 총합: O(N)
            merged.push(mergeTwoLists(l1, l2));
        }

        // 다음 라운드를 위해 병합된 리스트로 교체
        lists = merged;
    }

    return lists[0];
}
