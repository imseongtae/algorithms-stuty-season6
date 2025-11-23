/**
 * Set 대신 직접 해시 테이블(객체)을 사용하는 버전.
 *
 * 아이디어:
 * - jewelsTable: { [char]: true } 형태의 객체.
 *   - 어떤 문자가 보석인지 O(1)에 확인.
 * - stones(S)를 순회하면서 jewelsTable[stone] 이 true 인 경우만 카운트.
 *
 * 시간 복잡도:
 * - 보석 테이블 구축: O(|J|)
 * - 돌 순회: O(|S|)
 * 전체: O(|J| + |S|)
 *
 * 공간 복잡도:
 * - jewelsTable 크기: O(|J|)
 */
function numJewelsInStonesHash(J: string, S: string): number {
    // 해시 테이블: key = 보석 문자, value = true
    const jewelsTable: { [ch: string]: boolean } = {};

    // J의 각 문자를 해시 테이블에 저장
    for (const ch of J) {
        jewelsTable[ch] = true;
    }

    let count = 0;

    // S의 각 돌 문자를 순회하면서
    for (const stone of S) {
        // 해당 문자가 보석이면 카운트 증가
        // undefined가 아닌지만 보면 되지만, 명시적으로 true 비교
        if (jewelsTable[stone] === true) {
            count += 1;
        }
    }

    return count;
}

export { numJewelsInStonesHash };
