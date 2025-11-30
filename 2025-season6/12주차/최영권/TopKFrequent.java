package algorithm;

import java.util.*;

// 시간복잡도 : O(n)
// https://leetcode.com/problems/top-k-frequent-elements/description/
public class TopKFrequent {

    public static void main(String[] args) {
        System.out.println(Arrays.toString(topKFrequent(new int[]{1,2,1,2,1,2,3,1,3,2}, 2)));
    }

    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        List<Integer>[] buckets = new List[nums.length + 1];

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            int num = entry.getKey();      // 숫자
            int freq = entry.getValue();   // 빈도수

            if (buckets[freq] == null) {
                buckets[freq] = new ArrayList<>();
            }
            buckets[freq].add(num);  // 빈도수를 인덱스로!
        }

        List<Integer> topK = new ArrayList<>();
        for (int i = buckets.length - 1; i >= 0 && topK.size() < k; i--) {
            List<Integer> list = buckets[i];
            if (list != null) {
                for (Integer num : list) {
                    topK.add(num);
                    if (topK.size() == k) {
                        break;  // k개 채우면 중단
                    }
                }
            }
        }

        return topK.stream().mapToInt(i -> i).toArray();
    }
}
