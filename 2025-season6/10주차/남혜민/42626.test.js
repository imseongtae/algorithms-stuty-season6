import assert from 'assert';
import test from 'node:test';
import { solution } from './42626.js';

// 예시 테스트 (프로그래머스 예제)
test('example case 1', () => {
    const scoville = [1, 2, 3, 9, 10, 12];
    const K = 7;
    const result = solution(scoville, K);
    assert.strictEqual(result, 2);
});

// 이미 모든 음식이 K 이상인 경우
test('all already >= K', () => {
    const scoville = [7, 8, 10];
    const K = 7;
    const result = solution(scoville, K);
    assert.strictEqual(result, 0); // 섞을 필요 없음
});

// 만들 수 없는 경우 (가장 맵게 만들어도 K 미만)
test('impossible case', () => {
    const scoville = [1, 1, 1];
    const K = 10;
    const result = solution(scoville, K);
    assert.strictEqual(result, -1);
});

// 최소/단일 원소 케이스
test('single element - already >= K', () => {
    const scoville = [10];
    const K = 7;
    const result = solution(scoville, K);
    assert.strictEqual(result, 0);
});

test('single element - < K (impossible)', () => {
    const scoville = [3];
    const K = 7;
    const result = solution(scoville, K);
    assert.strictEqual(result, -1);
});

// 여러 번 섞는 케이스
test('multiple mixes needed', () => {
    const scoville = [1, 1, 2, 3, 9];
    const K = 10;
    const result = solution(scoville, K);
    // 실제로 4번 섞어야 K 이상이 됨
    assert.strictEqual(result, 4);
});
