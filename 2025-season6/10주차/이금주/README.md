# 더 맵게 (Programmers)

## 문제 링크
**Programmers**: https://school.programmers.co.kr/learn/courses/30/lessons/42626

---

## 문제 설명

모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 가장 낮은 두 개를 섞는 최소 횟수 구하기

**섞는 방법**
```
섞은 음식 = 가장 맵지 않은 음식 + (두 번째로 맵지 않은 음식 × 2)
```

**예제**
```
입력: scoville = [1, 2, 3, 9, 10, 12], K = 7
출력: 2

과정:
1. 1 + (2 × 2) = 5 → [5, 3, 9, 10, 12]
2. 3 + (5 × 2) = 13 → [13, 9, 10, 12]
→ 모두 7 이상! 섞은 횟수 = 2
```

**제약 조건**
- scoville 길이: 2 ~ 1,000,000
- K: 0 ~ 1,000,000,000
- scoville 원소: 0 ~ 1,000,000
- 불가능하면 -1 반환

---

## 핵심 아이디어

### 왜 우선순위 큐(Min Heap)?
```
매번 가장 작은 2개를 빠르게 찾아야 함
→ 최소 힙 사용!

정렬: O(n log n) × 반복 횟수 ❌
힙: O(log n) × 반복 횟수 ✅
```

---

## 풀이

### 코드
```java
import java.util.PriorityQueue;

class Solution {
    public int solution(int[] scoville, int K) {
        // 최소 힙 생성 (작은 값이 우선)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // SC: O(n)
        
        // 모든 스코빌 지수를 힙에 추가
        for(int s : scoville) { // TC: O(n)
            minHeap.offer(s); // TC: O(log n)
        }
        // 전체 힙 구성: TC: O(n log n)
        
        int answer = 0; // 섞은 횟수
        
        // 가장 작은 값이 K 이상이 될 때까지 반복
        while(minHeap.peek() < K) { // TC: O(n) - 최악 n번 반복
            // 음식이 1개만 남았는데 K 미만이면 불가능
            if(minHeap.size() < 2) { // TC: O(1)
                return -1;
            }
            
            // 가장 맵지 않은 음식
            int first = minHeap.poll(); // TC: O(log n)
            // 두 번째로 맵지 않은 음식
            int second = minHeap.poll(); // TC: O(log n)
            
            // 섞은 음식의 스코빌 지수
            int mixed = first + (second * 2); // TC: O(1)
            
            // 힙에 다시 추가
            minHeap.offer(mixed); // TC: O(log n)
            
            answer++; // 섞은 횟수 증가
        }
        
        return answer;
    }
}

/*
═══════════════════════════════════════════════════════════════
시간 복잡도 분석
═══════════════════════════════════════════════════════════════

1. 초기 힙 구성
   - for 루프: n번 반복
   - 각 offer(): O(log n)
   - 총: O(n log n)

2. while 루프 (메인 로직)
   - 최악의 경우: n-1번 반복
   
   - 각 반복:
     * peek(): O(1)
     * poll() × 2: O(log n) × 2
     * 계산: O(1)
     * offer(): O(log n)
     → 각 반복: O(log n)
   
   - 총: O(n log n)

최종 TC: O(n log n)

═══════════════════════════════════════════════════════════════
공간 복잡도 분석
═══════════════════════════════════════════════════════════════

- minHeap: 최대 n개 원소 → O(n)
- 기타 변수들: O(1)

최종 SC: O(n)

═══════════════════════════════════════════════════════════════
예제 동작 과정
═══════════════════════════════════════════════════════════════

입력: [1, 2, 3, 9, 10, 12], K = 7

초기 힙: [1, 2, 3, 9, 10, 12]

1회차:
- peek(): 1 < 7 → 섞기
- poll(): 1, 2
- mixed = 1 + (2 × 2) = 5
- offer(5)
- 힙: [3, 5, 9, 10, 12]
- answer = 1

2회차:
- peek(): 3 < 7 → 섞기
- poll(): 3, 5
- mixed = 3 + (5 × 2) = 13
- offer(13)
- 힙: [9, 10, 12, 13]
- answer = 2

3회차:
- peek(): 9 >= 7 → 종료!
- return 2

═══════════════════════════════════════════════════════════════
핵심 포인트
═══════════════════════════════════════════════════════════════

1. 우선순위 큐 사용
   - 매번 최소값 2개를 O(log n)에 찾음
   - 정렬보다 효율적

2. 종료 조건
   - peek() >= K: 성공
   - size < 2: 실패 (더 이상 섞을 수 없음)

3. 예외 처리
   - 모든 값이 0이고 K > 0 → -1

특징:
✅ 시간 효율적 O(n log n)
✅ n = 1,000,000일 때도 빠름
✅ 구현 간단
*/
```

---

## 복잡도

| 구분 | 복잡도 | 설명 |
|------|--------|------|
| **시간** | O(n log n) | 힙 구성 + n번 반복 × log n |
| **공간** | O(n) | 최소 힙 |

---

## 핵심 개념

### 1. 우선순위 큐 (Min Heap)
```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

minHeap.offer(x);  // 삽입: O(log n)
minHeap.poll();    // 최소값 제거: O(log n)
minHeap.peek();    // 최소값 확인: O(1)
```

### 2. 종료 조건
```java
while(minHeap.peek() < K) {
    if(minHeap.size() < 2) return -1;  // 불가능
    // 섞기
}
return answer;  // 성공
```

### 3. 실패 케이스
```
[0, 0], K = 1
→ 0 + (0 × 2) = 0
→ 아무리 섞어도 0
→ return -1
```

# Design HashMap

## 문제 링크
**LeetCode**: https://leetcode.com/problems/design-hashmap/

---

## 문제 설명

내장 해시 테이블 라이브러리 없이 HashMap 직접 구현하기

**구현할 메서드**
- `MyHashMap()`: 빈 맵 초기화
- `put(key, value)`: key-value 삽입 또는 업데이트
- `get(key)`: key에 해당하는 value 반환, 없으면 -1
- `remove(key)`: key 매핑 제거

**예제**
```
myHashMap.put(1, 1);    → [[1,1]]
myHashMap.put(2, 2);    → [[1,1], [2,2]]
myHashMap.get(1);       → 1
myHashMap.get(3);       → -1 (없음)
myHashMap.put(2, 1);    → [[1,1], [2,1]] (업데이트)
myHashMap.remove(2);    → [[1,1]]
```

**제약 조건**
- `0 <= key, value <= 10^6`
- 최대 `10^4`번 호출

---

## 핵심 아이디어

### HashMap의 기본 원리
```
1. 해시 함수로 인덱스 계산
   key → hash(key) → index

2. 충돌 처리 (Chaining)
   같은 인덱스에 여러 key가 매핑될 수 있음
   → 연결 리스트로 저장

구조:
bucket[0] → [key1, val1] → [key2, val2]
bucket[1] → [key3, val3]
bucket[2] → null
...
```

---

## 풀이

### 코드
```java
class MyHashMap {
    // 노드 클래스: key-value 쌍을 저장
    class Node {
        int key;
        int value;
        Node next;
        
        Node(int key, int value) { // TC: O(1), SC: O(1)
            this.key = key;
            this.value = value;
            this.next = null;
        }
    }
    
    private static final int SIZE = 10000; // 버킷 크기
    private Node[] buckets; // 버킷 배열 // SC: O(SIZE)
    
    // 생성자: 빈 맵 초기화
    public MyHashMap() { // TC: O(SIZE), SC: O(SIZE)
        buckets = new Node[SIZE]; // TC: O(1), SC: O(SIZE)
    }
    
    // 해시 함수: key를 버킷 인덱스로 변환
    private int hash(int key) { // TC: O(1), SC: O(1)
        return key % SIZE;
    }
    
    // key-value 삽입 또는 업데이트
    public void put(int key, int value) { // TC: O(n), SC: O(1)
        int index = hash(key); // TC: O(1)
        
        // 버킷이 비어있으면 새 노드 생성
        if(buckets[index] == null) { // TC: O(1)
            buckets[index] = new Node(key, value); // TC: O(1), SC: O(1)
            return;
        }
        
        // 버킷에서 key 찾기
        Node current = buckets[index]; // TC: O(1)
        while(current != null) { // TC: O(n) - n은 체인 길이
            // key가 이미 존재하면 value 업데이트
            if(current.key == key) { // TC: O(1)
                current.value = value; // TC: O(1)
                return;
            }
            // 체인의 끝에 도달
            if(current.next == null) { // TC: O(1)
                current.next = new Node(key, value); // TC: O(1), SC: O(1)
                return;
            }
            current = current.next; // TC: O(1)
        }
    }
    
    // key에 해당하는 value 반환
    public int get(int key) { // TC: O(n), SC: O(1)
        int index = hash(key); // TC: O(1)
        Node current = buckets[index]; // TC: O(1)
        
        // 체인을 순회하며 key 찾기
        while(current != null) { // TC: O(n) - n은 체인 길이
            if(current.key == key) { // TC: O(1)
                return current.value; // TC: O(1)
            }
            current = current.next; // TC: O(1)
        }
        
        return -1; // key를 찾지 못함
    }
    
    // key 매핑 제거
    public void remove(int key) { // TC: O(n), SC: O(1)
        int index = hash(key); // TC: O(1)
        Node current = buckets[index]; // TC: O(1)
        
        // 버킷이 비어있으면 종료
        if(current == null) return; // TC: O(1)
        
        // 첫 번째 노드가 삭제 대상인 경우
        if(current.key == key) { // TC: O(1)
            buckets[index] = current.next; // TC: O(1)
            return;
        }
        
        // 체인을 순회하며 key 찾기
        while(current.next != null) { // TC: O(n) - n은 체인 길이
            if(current.next.key == key) { // TC: O(1)
                current.next = current.next.next; // TC: O(1) - 노드 제거
                return;
            }
            current = current.next; // TC: O(1)
        }
    }
}

/*
═══════════════════════════════════════════════════════════════
시간 복잡도 분석
═══════════════════════════════════════════════════════════════

n = 특정 버킷의 체인 길이 (충돌 횟수)
k = 전체 key-value 쌍 개수

1. MyHashMap() 생성자
   - 배열 생성: O(SIZE) = O(10000) = O(1)

2. hash(key)
   - 나머지 연산: O(1)

3. put(key, value)
   - hash(): O(1)
   - 체인 순회: O(n)
   - 평균: O(1) (충돌이 적을 때)
   - 최악: O(k/SIZE) (모든 key가 같은 버킷에)

4. get(key)
   - hash(): O(1)
   - 체인 순회: O(n)
   - 평균: O(1)
   - 최악: O(k/SIZE)

5. remove(key)
   - hash(): O(1)
   - 체인 순회: O(n)
   - 평균: O(1)
   - 최악: O(k/SIZE)

평균 TC: O(1) ✅
최악 TC: O(k/SIZE) ≈ O(k) (모든 key 충돌 시)

═══════════════════════════════════════════════════════════════
공간 복잡도 분석
═══════════════════════════════════════════════════════════════

1. buckets 배열
   - 크기: SIZE = 10000
   - SC: O(SIZE)

2. 노드들
   - k개의 key-value 쌍
   - 각 노드: O(1)
   - 총: O(k)

최종 SC: O(SIZE + k) = O(k) (SIZE는 상수)

═══════════════════════════════════════════════════════════════
동작 예시
═══════════════════════════════════════════════════════════════

SIZE = 10, key들이 1, 11, 21 (모두 hash = 1)

put(1, 100):
  buckets[1] → [1,100]

put(11, 200):
  buckets[1] → [1,100] → [11,200]

put(21, 300):
  buckets[1] → [1,100] → [11,200] → [21,300]

get(11):
  1. hash(11) = 1
  2. buckets[1]부터 순회
  3. [1,100] (skip) → [11,200] (찾음!)
  4. return 200

remove(11):
  1. hash(11) = 1
  2. buckets[1]부터 순회
  3. [1,100].next = [11,200] (삭제 대상)
  4. [1,100].next = [21,300]
  결과: [1,100] → [21,300]

═══════════════════════════════════════════════════════════════
핵심 포인트
═══════════════════════════════════════════════════════════════

1. 해시 함수
   - key % SIZE로 버킷 인덱스 계산
   - 간단하지만 효과적

2. 충돌 처리 (Chaining)
   - 연결 리스트로 같은 인덱스의 key들 저장
   - 순회하며 key 찾기

3. SIZE 선택
   - 너무 작으면: 충돌 많음 → 느림
   - 너무 크면: 메모리 낭비
   - 10000: 적당한 균형 ✅

4. 평균 vs 최악
   - 평균: O(1) (충돌 적음)
   - 최악: O(k) (모든 key 충돌)
   - 실제로는 평균에 가까움

특징:
✅ 간단한 구현
✅ 평균 O(1) 연산
✅ 메모리 효율적
❌ 최악의 경우 O(k)
*/
```

---

## 복잡도

| 연산 | 평균 | 최악 |
|------|------|------|
| **put()** | O(1) | O(k) |
| **get()** | O(1) | O(k) |
| **remove()** | O(1) | O(k) |
| **공간** | O(k) | O(k) |

*k = 저장된 key-value 쌍 개수*

---

## 핵심 개념

### 1. 해시 함수
```java
private int hash(int key) {
    return key % SIZE;  // 0 ~ SIZE-1 범위의 인덱스
}

예:
key = 1    → hash = 1 % 10000 = 1
key = 10001 → hash = 10001 % 10000 = 1  (충돌!)
```

### 2. 충돌 처리 (Chaining)
```
buckets[1] → [1, val1] → [10001, val2] → null

같은 인덱스에 여러 key가 연결 리스트로 저장됨
```

### 3. SIZE 선택의 중요성
```
SIZE = 10:
- key 1~100 저장 시
- 평균 체인 길이 = 100/10 = 10
- 느림!

SIZE = 10000:
- key 1~100 저장 시
- 평균 체인 길이 = 100/10000 = 0.01
- 빠름! ✅
```

### 4. 시간 복잡도 계산
```
평균 체인 길이 = k / SIZE

put/get/remove TC = O(k / SIZE)

SIZE가 충분히 크면:
→ k / SIZE ≈ 1
→ O(1) ✅
```

---

## 개선 방법

### 더 나은 해시 함수
```java
// 현재: key % SIZE
// 개선: 소수를 사용하면 충돌 감소
private static final int SIZE = 10007; // 소수 사용
```

### Dynamic Resizing
```java
// k가 SIZE를 초과하면 SIZE를 2배로 증가
if(count > SIZE) {
    resize();  // 모든 노드를 새 배열에 재배치
}
```
