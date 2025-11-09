/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    //k개의 리스트를 하나로 병합
    public ListNode mergeKLists(ListNode[] lists) { 
        // 빈 배열이면 null 반환
        if(lists == null || lists.length == 0){ //TC : O(1)
            return null; //TC : O(1)
        }
        
        ListNode result  = lists[0]; //SC : O(1) - 포인터만 저장

        // 첫번쨰 리스트부터 하나씩 합치기
        for(int i=1; i<lists.length; i++){  // TC: O(k) - k개 리스트
            result = mergeTwoLists(result, lists[i]); // TC: O(N) - N은 두 리스트 길이 합
        }
         return result; // TC: O(1)

    }

    // 2개의 정렬된 리스트를 병합하는 함수
    private ListNode mergeTwoLists(ListNode l1, ListNode l2){
        //더미 노드 시작
        ListNode dummy = new ListNode(0); // SC: O(1)
        ListNode current = dummy; // SC: O(1)

        // 두 리스트가 모두 남아 있는 동안
        while(l1 !=null & l2 !=null){ // TC: O(n+m) - 두 리스트 길이만큼
            if(l1.val <= l2.val){
                current.next = l1; // TC: O(1) 
                l1=l1.next;  // TC: O(1) 
            }
            else{
                current.next = l2; // TC: O(1) 
                l2=l2.next;  // TC: O(1) 
            }
            current = current.next; // TC: O(1) - current 이동
        }
        // 남은 노드들 연결
        current.next = (l1 !=null) ? l1:l2; // TC: O(1)

        return dummy.next; // TC: O(1) - 더미 다음 노드 반환
    }
}

/*
전체 복잡도 분석

1. mergeKLists 메서드
   - for 루프: k번 반복
     * 각 반복마다 mergeTwoLists 호출
     * 첫 번째: N/k + N/k = 2N/k 노드 처리
     * 두 번째: 2N/k + N/k = 3N/k 노드 처리
     * ...
     * 마지막: (k-1)N/k + N/k = N 노드 처리
     → 총합: N/k + 2N/k + 3N/k + ... + N = N(1 + 2 + ... + k)/k
     → = N * k(k+1)/(2k) = N * (k+1)/2 ≈ O(kN)
   - 전체 TC: O(kN) - k는 리스트 개수, N은 전체 노드 수
   - 전체 SC: O(1) - 추가 공간 사용 안 함 (포인터만)

2. mergeTwoLists 메서드
   - while 루프: 두 리스트 길이 합만큼 반복
   - 각 반복: O(1) 연산
   - 전체 TC: O(n+m) - n과 m은 각 리스트 길이
   - 전체 SC: O(1) - 더미 노드와 포인터만 사용

최종 복잡도:
- TC: O(kN) - k개 리스트, 총 N개 노드
- SC: O(1) - 추가 공간 사용 안 함
*/
