import * as assert from 'assert';
import { test } from 'node:test';
import { numJewelsInStonesHash } from './jewels-and-stones-hash';

test('example 1 - hash', () => {
    const J = 'aA';
    const S = 'aAAbbbb';
    const result = numJewelsInStonesHash(J, S);
    assert.strictEqual(result, 3);
});

test('example 2 - hash', () => {
    const J = 'z';
    const S = 'ZZ';
    const result = numJewelsInStonesHash(J, S);
    assert.strictEqual(result, 0);
});

// 중복 보석 문자, 중복 돌 문자
test('multiple jewels and stones - hash', () => {
    const J = 'aAb';
    const S = 'aaaBBBbbA';
    const result = numJewelsInStonesHash(J, S);
    // jewels: a, A, b
    // stones: a a a B B B b b A -> a(3) + b(2) + A(1) = 6
    assert.strictEqual(result, 6);
});

// 대소문자 구분 확인
test('case sensitivity - hash', () => {
    const J = 'a';
    const S = 'aAaaA';
    const result = numJewelsInStonesHash(J, S);
    // only lowercase 'a' count
    assert.strictEqual(result, 3);
});
