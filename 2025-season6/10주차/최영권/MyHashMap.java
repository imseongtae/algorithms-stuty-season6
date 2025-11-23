package algorithm;

import java.util.Arrays;

/**
 * 시간 복잡도 : O(1)
 */
// https://leetcode.com/problems/design-hashmap/
public class MyHashMap {
    private int[] map;

    public MyHashMap() {
        map = new int[1_000_005];
        Arrays.fill(map, -1);
    }

    public void put(int key, int value) {
        map[key] = value;
    }

    public int get(int key) {
        return map[key];
    }

    public void remove(int key) {
        map[key] = -1;
    }
}
