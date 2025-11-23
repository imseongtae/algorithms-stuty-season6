import * as assert from 'assert';
import { describe, test } from 'node:test';
import { MyHashMap } from './design-hashmap';

describe('MyHashMap - LeetCode example', () => {
    test('should follow the example sequence', () => {
        const myHashMap = new MyHashMap();
        myHashMap.put(1, 1);
        myHashMap.put(2, 2);
        assert.strictEqual(myHashMap.get(1), 1);
        assert.strictEqual(myHashMap.get(3), -1);
        myHashMap.put(2, 1);
        assert.strictEqual(myHashMap.get(2), 1);
        myHashMap.remove(2);
        assert.strictEqual(myHashMap.get(2), -1);
    });
});

describe('MyHashMap - overwrite key', () => {
    test('should update value when key already exists', () => {
        const map = new MyHashMap();
        map.put(10, 100);
        assert.strictEqual(map.get(10), 100);

        map.put(10, 200);
        assert.strictEqual(map.get(10), 200);

        map.put(10, 300);
        assert.strictEqual(map.get(10), 300);
    });
});

describe('MyHashMap - missing keys', () => {
    test('should return -1 for non-existent key', () => {
        const map = new MyHashMap();
        assert.strictEqual(map.get(999), -1);

        map.put(1, 10);
        assert.strictEqual(map.get(2), -1);
    });

    test('should return -1 after key is removed', () => {
        const map = new MyHashMap();
        map.put(5, 50);
        assert.strictEqual(map.get(5), 50);

        map.remove(5);
        assert.strictEqual(map.get(5), -1);

        // removing again should not throw or change other keys
        map.remove(5);
        map.put(6, 60);
        assert.strictEqual(map.get(6), 60);
    });
});

describe('MyHashMap - multiple keys', () => {
    test('should handle multiple distinct keys', () => {
        const map = new MyHashMap();
        map.put(1, 10);
        map.put(2, 20);
        map.put(3, 30);
        map.put(4, 40);

        assert.strictEqual(map.get(1), 10);
        assert.strictEqual(map.get(2), 20);
        assert.strictEqual(map.get(3), 30);
        assert.strictEqual(map.get(4), 40);

        // change some values
        map.put(2, 200);
        map.put(4, 400);

        assert.strictEqual(map.get(1), 10);
        assert.strictEqual(map.get(2), 200);
        assert.strictEqual(map.get(3), 30);
        assert.strictEqual(map.get(4), 400);
    });

    test('should handle key 0 and large keys', () => {
        const map = new MyHashMap();
        map.put(0, 1000);
        map.put(1000000, 42);

        assert.strictEqual(map.get(0), 1000);
        assert.strictEqual(map.get(1000000), 42);

        map.remove(0);
        assert.strictEqual(map.get(0), -1);
        assert.strictEqual(map.get(1000000), 42);
    });
});

describe('MyHashMap - interleaved operations', () => {
    test('should maintain correctness under interleaved put/get/remove', () => {
        const map = new MyHashMap();

        map.put(1, 1); // {1:1}
        map.put(2, 2); // {1:1, 2:2}
        map.put(3, 3); // {1:1, 2:2, 3:3}
        assert.strictEqual(map.get(2), 2);

        map.remove(2); // {1:1, 3:3}
        assert.strictEqual(map.get(2), -1);

        map.put(4, 4); // {1:1, 3:3, 4:4}
        map.put(3, 30); // {1:1, 3:30, 4:4}
        assert.strictEqual(map.get(3), 30);

        map.remove(1); // {3:30, 4:4}
        assert.strictEqual(map.get(1), -1);
        assert.strictEqual(map.get(4), 4);
    });
});

describe('MyHashMap - collision / many keys', () => {
    test('should handle many keys without losing data', () => {
        const map = new MyHashMap();
        const n = 200;

        for (let i = 0; i < n; i++) {
            map.put(i, i * 10);
        }

        for (let i = 0; i < n; i++) {
            assert.strictEqual(map.get(i), i * 10);
        }

        // remove half
        for (let i = 0; i < n; i += 2) {
            map.remove(i);
        }

        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                assert.strictEqual(map.get(i), -1);
            } else {
                assert.strictEqual(map.get(i), i * 10);
            }
        }
    });
});
