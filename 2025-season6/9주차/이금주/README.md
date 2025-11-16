# Merge K Sorted Lists

## 문제 링크
**LeetCode**: https://leetcode.com/problems/merge-k-sorted-lists/

---

## 문제 설명

k개의 정렬된 연결 리스트를 하나의 정렬된 리스트로 병합

**예제**
```
입력: [[1,4,5], [1,3,4], [2,6]]
출력: [1,1,2,3,4,4,5,6]
```

**용어**
- **k**: 리스트 개수
- **N**: 전체 노드 수

---

## 풀이 1: 순차적 병합 (반복문 Merge)

### 접근 방법
첫 번째 리스트부터 시작해서 하나씩 순차적으로 병합
```
[A, B, C, D] → A → AB → ABC → ABCD
```

### 코드
```java
class Solution {
    // k개의 리스트를 하나로 병합
    public ListNode mergeKLists(ListNode[] lists) { 
        if(lists == null || lists.length == 0) return null;
        
        ListNode result = lists[0]; // SC: O(1) - 포인터만 저장
        
        // 첫 번째 리스트부터 하나씩 합치기
        for(int i = 1; i < lists.length; i++) { // TC: O(k)
            result = mergeTwoLists(result, lists[i]); // TC: O(현재까지 병합된 길이)
        }
        return result;
    }
    
    // 2개의 정렬된 리스트를 병합하는 함수 (반복문)
    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // SC: O(1)
        ListNode current = dummy; // SC: O(1)
        
        // 두 리스트가 모두 남아있는 동안
        while(l1 != null && l2 != null) { // TC: O(n+m)
            if(l1.val <= l2.val) {
                current.next = l1; // TC: O(1)
                l1 = l1.next; // TC: O(1)
            } else {
                current.next = l2; // TC: O(1)
                l2 = l2.next; // TC: O(1)
            }
            current = current.next; // TC: O(1)
        }
        
        // 남은 노드들 연결
        current.next = (l1 != null) ? l1 : l2; // TC: O(1)
        return dummy.next; // TC: O(1)
    }
}

/*
전체 복잡도 분석:

병합 과정:
- 1회차: N/k + N/k = 2N/k 노드 처리
- 2회차: 2N/k + N/k = 3N/k 노드 처리
- ...
- k-1회차: (k-1)N/k + N/k = N 노드 처리

총 시간 = N/k + 2N/k + ... + N
        = N(1 + 2 + ... + k) / k
        = N × k(k+1) / (2k)
        ≈ O(kN)

최종 복잡도:
- TC: O(kN) - k개 리스트, 총 N개 노드
- SC: O(1) - 추가 공간 사용 안 함

특징:
✅ 구현 간단
✅ 메모리 효율적 (O(1))
❌ k가 크면 느림
*/
```

---

## 풀이 2: 분할 정복 (재귀 Merge)

### 접근 방법
병합 정렬처럼 반으로 나눠서 재귀적으로 병합
```
       [A,B,C,D]
      /        \
   [A,B]      [C,D]
   /  \       /  \
 [A] [B]   [C] [D]
```

### 코드
```java
class Solution {
    // 메인 함수: k개의 리스트를 병합
    public ListNode mergeKLists(ListNode[] lists) { 
        if (lists.length == 0) return null; // TC: O(1)
        return divideAndConquer(lists, 0, lists.length - 1); // TC: O(N log k), SC: O(N + log k)
    }
    
    // 배열을 반으로 나눠서 병합하는 함수 (분할 정복)
    private ListNode divideAndConquer(ListNode[] lists, int left, int right) {
        if (left == right) return lists[left]; // TC: O(1), SC: O(1)
        
        // 중간 지점
        int mid = left + (right - left) / 2; // TC: O(1), SC: O(1)
        
        // 왼쪽 절반 재귀 처리
        ListNode l1 = divideAndConquer(lists, left, mid); // TC: O(N/2 log k), SC: O(log k)
        
        // 오른쪽 절반 재귀 처리
        ListNode l2 = divideAndConquer(lists, mid + 1, right); // TC: O(N/2 log k), SC: O(log k)
        
        // 두 결과를 병합
        return mergeTwoLists(l1, l2); // TC: O(현재 레벨 노드 수), SC: O(N)
    }
    
    // 2개의 정렬된 리스트를 재귀로 병합
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) return l2; // TC: O(1), SC: O(1)
        if(l2 == null) return l1; // TC: O(1), SC: O(1)
        
        // l1이 더 작으면
        if(l1.val < l2.val) { // TC: O(1)
            l1.next = mergeTwoLists(l1.next, l2); // TC: O(n+m-1), SC: O(n+m)
            return l1; // TC: O(1)
        } else { // l2의 값이 더 작거나 같으면
            l2.next = mergeTwoLists(l1, l2.next); // TC: O(n+m-1), SC: O(n+m)
            return l2; // TC: O(1)
        }
    }
}

/*
전체 복잡도 분석:

재귀 트리 구조 (k=8 예시):
                레벨 0: [0-7] → N개 노드 처리
               /              \
        레벨 1: [0-3]          [4-7] → N개 노드 처리
           /    \            /    \
    레벨 2: [0-1] [2-3]  [4-5] [6-7] → N개 노드 처리
           /\    /\      /\    /\
    레벨 3: [0][1][2][3][4][5][6][7]

- 트리 높이: log₂(k)
- 각 레벨에서 N개 노드 처리

최종 복잡도:
- TC: O(N log k)
  * 각 레벨: N개 노드 처리
  * 총 레벨: log k
  
- SC: O(N + log k)
  * divideAndConquer 재귀 스택: O(log k)
  * mergeTwoLists 재귀 스택: O(N) (최악)
  * 두 스택이 중첩됨!

특징:
✅ 시간 효율적 (k가 클 때)
❌ 메모리 많이 사용 (O(N + log k))
❌ 스택 오버플로우 위험
*/
```

---

## 성능 비교

### k=100, N=10,000 기준

| 구분 | 순차적 병합 | 분할 정복 |
|------|-----------|----------|
| **시간** | O(kN) = 1,000,000 | O(N log k) = 70,000 |
| **공간** | O(1) = 5 프레임 | O(N + log k) = 10,007 프레임 |
| **속도** | 느림 | **14배 빠름** ✅ |
| **메모리** | **효율적** ✅ | 비효율적 |

---

## 선택 가이드

```
┌─────────────────────────────────────┐
│  k < 10        → 순차적 병합         │
│  (간단, 메모리 효율)                 │
│                                     │
│  k > 100       → 분할 정복           │
│  (시간 효율)                        │
│                                     │
│  메모리 제한    → 순차적 병합         │
│  성능 중요     → 분할 정복           │
└─────────────────────────────────────┘
```

---

## 핵심 개념

### 1. 시간 복잡도 차이
```
순차적: O(kN)
- 각 병합마다 리스트가 길어짐
- N/k → 2N/k → 3N/k → ... → N

분할 정복: O(N log k)
- 각 레벨에서 N개 처리
- 트리 높이 log k
```

### 2. 공간 복잡도 차이
```
순차적: O(1)
- 반복문만 사용
- 추가 스택 없음

분할 정복: O(N + log k)
- divideAndConquer 스택: O(log k)
- mergeTwoLists 스택: O(N)
- 두 스택이 중첩됨!
```

### 3. 개선 방법
mergeTwoLists를 **반복문**으로 바꾸면:
- TC: O(N log k) 유지
- **SC: O(log k)로 개선** ✅
- 
물론이죠! 아래는 해당 문제에 대한 **README** 문서 초안입니다. 문제 설명, 알고리즘, 시간 복잡도 및 공간 복잡도 분석 등을 포함하여 작성해봤습니다.

---

# k-Closest Points to Origin

### 문제 링크:

[LeetCode - K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

### 문제 설명:

주어진 **2D 평면에서** `points` 배열이 주어집니다. 각 포인트는 `(x, y)` 좌표를 가지며, 이 중 **원점(0, 0)** 에 가장 가까운 **k개의 포인트**를 반환해야 합니다.

**입력:**

* `points`: n개의 점이 포함된 2D 배열 `points[i] = [x, y]`
* `k`: 정수 k (1 ≤ k ≤ n), 반환할 포인트의 개수

**출력:**

* 원점에 가장 가까운 k개의 점을 포함하는 2D 배열 반환

---

### 알고리즘 설명

이 문제를 해결하기 위해서 **정렬(Sorting)** 방식을 사용하여 각 점과 원점의 **유클리드 거리(Euclidean distance)**를 기준으로 정렬한 후, 가장 가까운 k개의 점을 선택합니다.

#### 접근 방법:

1. **거리 계산**: 각 점과 원점 사이의 거리를 계산합니다. 거리는 **유클리드 거리**를 사용할 수 있지만, 제곱근을 구하는 연산을 피하기 위해 거리를 제곱으로 비교합니다. 즉, `(x^2 + y^2)`를 사용합니다.

2. **정렬**: 주어진 점들을 원점과의 거리 기준으로 오름차순으로 정렬합니다. 가장 가까운 점부터 정렬됩니다.

3. **k개의 점 추출**: 정렬된 배열에서 처음 k개의 점만 반환합니다.

---

### 코드

```java
import java.util.Arrays;

class Solution {
    // 방법 1: 정렬 사용 
    public int[][] kClosest(int[][] points, int k) {
        // 거리 기준으로 정렬
        Arrays.sort(points, (a, b) -> {
            int distA = a[0] * a[0] + a[1] * a[1]; // 거리 계산: a
            int distB = b[0] * b[0] + b[1] * b[1]; // 거리 계산: b
            return distA - distB; // 오름차순 정렬
        });
        
        // 앞에서 k개만 복사하여 반환
        return Arrays.copyOfRange(points, 0, k); // 처음 k개 요소 반환
    }
}
```

---

### 시간 복잡도 (Time Complexity)

1. **Arrays.sort()**: 점들을 거리 기준으로 정렬하는 데 O(n log n) 시간이 걸립니다. `n`은 점의 개수입니다.

   * 각 비교에서 거리 계산이 O(1) 시간이 걸리므로 전체적으로 O(n log n)의 시간이 걸립니다.

2. **Arrays.copyOfRange()**: k개의 점을 반환하는 데 O(k) 시간이 걸립니다.

최종 시간 복잡도는 `O(n log n + k)`입니다. 여기서 k는 n에 비해 작을 수 있기 때문에, 대체로 **O(n log n)**으로 근사될 수 있습니다.

### 공간 복잡도 (Space Complexity)

1. **정렬에 필요한 공간**: 정렬을 수행하는 동안 **재귀 스택** 또는 **임시 배열**을 사용합니다. 이는 최악의 경우 O(log n)의 공간을 필요로 합니다.

2. **결과 배열**: k개의 점을 반환하므로 결과 배열의 공간은 **O(k)**입니다.

3. **임시 변수**: 비교를 위한 `distA`, `distB`와 같은 임시 변수를 저장하는 데 O(1) 공간이 필요합니다.

최종 공간 복잡도는 `O(log n + k)`입니다.

---

### 최종 복잡도 정리

* **시간 복잡도**: O(n log n + k) → 최종적으로 O(n log n)
* **공간 복잡도**: O(log n + k)

---

### 예시

#### 예시 1:

**입력:**

```java
points = [[1, 3], [-2, 2], [5, 8], [0, 1]]
k = 2
```

**출력:**

```java
[[[-2, 2], [0, 1]]
```

**설명**:

* (1, 3)과 원점 사이의 거리: ( \sqrt{1^2 + 3^2} = \sqrt{10} )
* (-2, 2)와 원점 사이의 거리: ( \sqrt{(-2)^2 + 2^2} = \sqrt{8} )
* (5, 8)과 원점 사이의 거리: ( \sqrt{5^2 + 8^2} = \sqrt{89} )
* (0, 1)과 원점 사이의 거리: ( \sqrt{0^2 + 1^2} = \sqrt{1} )

따라서, 원점에 가장 가까운 두 점은 `[-2, 2]`와 `[0, 1]`입니다.



