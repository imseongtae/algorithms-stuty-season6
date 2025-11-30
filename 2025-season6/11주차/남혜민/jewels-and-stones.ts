/**
 * J: jewels (중복 없는 문자 집합)
 * S: stones 문자열
 * 각 문자는 하나의 돌/보석을 뜻함
 * S 안에서 "보석(J에 포함되는 문자)"의 개수를 세는 문제.
 *
 * 접근:
 * 1. 보석 문자열 J를 Set으로 만들어 O(1) 시간에 포함 여부를 확인.
 * 2. 돌 문자열 S를 한 글자씩 순회하면서,
 *    해당 문자가 Set(J)에 포함되면 카운트를 1 증가.
 *
 * 시간 복잡도:
 * - Set 생성: O(|J|)
 * - S 순회: O(|S|)
 * 전체: O(|J| + |S|)
 *
 * 공간 복잡도:
 * - Set(J) 저장: O(|J|)
 */
function numJewelsInStones(J: string, S: string): number {
    // J의 각 문자를 보석 집합으로 저장
    // Set.has(c)는 평균적으로 O(1)에 동작
    const jewels = new Set<string>();
    for (const ch of J) {
        jewels.add(ch);
    }

    let count = 0;

    // S의 각 문자를 순회하면서 보석인지 확인
    for (const stone of S) {
        if (jewels.has(stone)) {
            count += 1;
        }
    }

    return count;
}

export { numJewelsInStones };
