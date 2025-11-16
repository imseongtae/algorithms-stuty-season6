import java.util.List;

class Solution {
    // 2개의 정렬된 리스트를 재귀로 병합
    public ListNode mergeTwoLists(ListNode l1, ListNode l2){
        if(l1 == null) return l2; // TC: O(1), SC: O(1)
        if(l2 == null) return l1; // TC: O(1), SC: O(1)

        //l1이 더 작으면
        if(l1.val < l2.val){// TC: O(1) - 비교 연산
            l1.next = mergeTwoLists(l1.next, l2); // TC: O(n+m-1), SC: O(n+m) - 재귀 호출
            return l1; // TC: O(1)
        } 
        else{ // l2의 값이 더 작거나 같으면
            l2.next = mergeTwoLists(l1, l2.next); // TC: O(n+m-1), SC: O(n+m) - 재귀 호출
            return l2; // TC: O(1)
        }
    }
     // 메인 함수: k개의 리스트를 병합
    public ListNode mergeKLists(ListNode[] lists) { 
        // 빈 배열이면 null 반환
        if (lists.length == 0) return null; // TC: O(1)
        //분할 정보
        return divideAndConquer(lists, 0, lists.length - 1); // TC: O(N log k), SC: O(N + log k)
    }

    //배열을 반으로 나눠서 병합하는 함수(분할 함수)
    private ListNode divideAndConquer(ListNode[] lists, int left, int right){
        if (left == right) return lists[left]; // TC: O(1), SC: O(1)

        //중간 지점
        int mid = left + (right - left) / 2; // TC: O(1), SC: O(1)

         // 왼쪽 절반 재귀 처리
        ListNode l1 = divideAndConquer(lists, left, mid); // TC: O(N/2 log k), SC:O(log k) 
        // 오른쪽 절반 재귀 처리
        ListNode l2 = divideAndConquer(lists, mid + 1, right); // TC: O(N/2 log k), SC: O(log k) 
        // 두 결과를 병합
        return mergeTwoLists(l1, l2); // TC: O(N/k at this level), SC: SC: O(N) - 재귀 스택
    }
}

/*
최종 복잡도(다른 사람의 최적화된 코드 보고 한 것)

시간 복잡도: O(N log k)
- N: 전체 노드 수 (모든 리스트의 노드 합)
- k: 리스트 개수
- 각 레벨에서 N개 노드 처리 × log k 레벨

공간 복잡도: O(N + log k)
- O(log k): divideAndConquer 재귀 스택 깊이
- O(N): mergeTwoLists 재귀 스택 깊이 (최악의 경우)
- 두 재귀가 중첩됨!

구체적 예시:
- k = 100 (리스트 개수)
- N = 10,000 (전체 노드)

메모리 사용:
- divideAndConquer: log₂(100) ≈ 7 스택 프레임
- mergeTwoLists: 최악 10,000 스택 프레임
- 총: 약 10,007 스택 프레임
*/
