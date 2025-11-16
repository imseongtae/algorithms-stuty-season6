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
    public void put(int key, int value) { 
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
            if(current.next == null) { 
                current.next = new Node(key, value); // TC: O(1), SC: O(1)
                return;
            }
            current = current.next; // TC: O(1)
        }
    }
    
    // key에 해당하는 value 반환
    public int get(int key) {
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
    public void remove(int key) { 
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
시간 복잡도 

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

공간 복잡도 

1. buckets 배열
   - 크기: SIZE = 10000
   - SC: O(SIZE)

2. 노드들
   - k개의 key-value 쌍
   - 각 노드: O(1)
   - 총: O(k)

최종 SC: O(SIZE + k) = O(k) (SIZE는 상수)

*/
