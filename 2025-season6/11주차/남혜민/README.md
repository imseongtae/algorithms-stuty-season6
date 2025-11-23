# 11주차 알고리즘 문제 풀이

## 문제 목록

### 1. Jewels and Stones

-   **파일**: `jewels-and-stones.ts`, `jewels-and-stones-hash.ts`
-   **테스트**: `jewels-and-stones.test.ts`, `jewels-and-stones-hash.test.ts`
-   **링크**: https://leetcode.com/problems/jewels-and-stones/
-   **난이도**: Easy
-   **요약**: 보석(J)에 해당하는 문자들이 돌(S) 문자열 안에 몇 개 포함되어 있는지 세는 문제
-   **접근 1 (Set 사용)**: J 를 `Set` 으로 만들어 S 를 한 번 순회하며 보석 여부를 O(1)에 체크
-   **접근 2 (직접 해시 테이블 구현)**: 단순 객체(`{ [ch: string]: boolean }`)를 사용해 보석 여부를 저장하고 조회
-   **시간복잡도**: O(|J| + |S|) – J 로 집합/해시 테이블 구성 후 S 한 번 순회
-   **공간복잡도**: O(|J|) – 보석 문자 개수만큼만 저장

## 학습 포인트

### 해시 테이블 / 집합 (Jewels and Stones)

-   **Membership Check 패턴**: "이 값이 집합에 속하는가?"를 빠르게 확인하기 위해 Set/해시 테이블 사용
-   **시간복잡도 비교**: `includes` 로 매번 선형 탐색하면 O(|J|·|S|) 이지만, Set/해시 테이블을 쓰면 O(|J| + |S|)
-   **자료구조 대체 연습**: 고수준 Set 대신, 객체/배열로 직접 해시 테이블을 흉내 내 보며 동작 원리 이해
