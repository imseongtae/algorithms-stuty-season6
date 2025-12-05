// topKFrequent1 vs topKFrequent2 성능 비교

// 최종 TC: O(n) + O(n) + O(n log n) + O(k) = O(2n) + O(n log n) + O(k) = O(n log n)
function topKFrequent1(nums: number[], k: number): number[] {
    const frequentMap = new Map()

    // TC: O(n), SC: O(n)
    nums.forEach(n => frequentMap.set(n, (frequentMap.get(n) || 0) + 1))

    return Array.from(frequentMap.entries()) // TC: O(n)
        .sort((a, b) => b[1] - a[1]) // TC: O(n log n)
        .slice(0, k)
        .map(a => a[0]) // TC: O(k)
}

// 버킷 sort 활용
// 최종 TC: O(n)
function topKFrequent2(nums: number[], k: number): number[] {
    const frequentMap = new Map()

    nums.forEach(n => frequentMap.set(n, (frequentMap.get(n) || 0) + 1))

    const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

    for (const [num, freq] of frequentMap.entries()) {
        buckets[freq].push(num)
    }

    const result: number[] = []
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i])
        }
    }

    return result
}

// 테스트 케이스 생성
function generateTestCase(n: number, uniqueRatio: number): number[] {
    const uniqueCount = Math.max(1, Math.floor(n * uniqueRatio));
    const nums: number[] = [];
    for (let i = 0; i < n; i++) {
        nums.push(Math.floor(Math.random() * uniqueCount));
    }
    return nums;
}

// 벤치마크 실행
function benchmark(name: string, fn: Function, nums: number[], k: number, iterations: number = 100) {
    // Warm-up
    for (let i = 0; i < 5; i++) {
        fn([...nums], k);
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn([...nums], k);
    }
    const end = performance.now();

    const avgTime = (end - start) / iterations;
    console.log(`${name}: ${avgTime.toFixed(3)}ms (avg of ${iterations} runs)`);
    return avgTime;
}

console.log("=".repeat(80));
console.log("topKFrequent1 (Sort) vs topKFrequent2 (Bucket Sort) 성능 비교");
console.log("=".repeat(80));

// 테스트 시나리오들
const scenarios = [
    { name: "작은 배열, 낮은 unique (1%)", n: 1000, ratio: 0.01, k: 5 },
    { name: "작은 배열, 중간 unique (30%)", n: 1000, ratio: 0.3, k: 5 },
    { name: "작은 배열, 높은 unique (90%)", n: 1000, ratio: 0.9, k: 5 },

    { name: "중간 배열, 낮은 unique (1%)", n: 10000, ratio: 0.01, k: 10 },
    { name: "중간 배열, 중간 unique (30%)", n: 10000, ratio: 0.3, k: 10 },
    { name: "중간 배열, 높은 unique (90%)", n: 10000, ratio: 0.9, k: 10 },

    { name: "큰 배열, 낮은 unique (1%)", n: 100000, ratio: 0.01, k: 10 },
    { name: "큰 배열, 중간 unique (30%)", n: 100000, ratio: 0.3, k: 10 },
    { name: "큰 배열, 높은 unique (90%)", n: 100000, ratio: 0.9, k: 10 },
];

const results: { scenario: string, method1: number, method2: number, winner: string, diff: string }[] = [];

scenarios.forEach(scenario => {
    console.log(`\n📊 ${scenario.name}`);
    console.log(`   n=${scenario.n.toLocaleString()}, unique≈${(scenario.n * scenario.ratio).toLocaleString()}, k=${scenario.k}`);
    console.log("-".repeat(80));

    const testData = generateTestCase(scenario.n, scenario.ratio);
    const iterations = scenario.n <= 10000 ? 100 : 10;

    const time1 = benchmark("  Method 1 (Sort)", topKFrequent1, testData, scenario.k, iterations);
    const time2 = benchmark("  Method 2 (Bucket)", topKFrequent2, testData, scenario.k, iterations);

    const faster = time1 < time2 ? "Method 1" : "Method 2";
    const diffPercent = ((Math.abs(time1 - time2) / Math.min(time1, time2)) * 100).toFixed(1);

    console.log(`  ✓ Winner: ${faster} (${diffPercent}% faster)`);

    results.push({
        scenario: scenario.name,
        method1: time1,
        method2: time2,
        winner: faster,
        diff: diffPercent
    });
});

// 요약 테이블
console.log("\n" + "=".repeat(80));
console.log("📈 종합 결과");
console.log("=".repeat(80));

console.log("\n시나리오별 승자:");
results.forEach((r, i) => {
    const icon = r.winner === "Method 1" ? "🔴" : "🔵";
    console.log(`${icon} ${r.scenario}`);
    console.log(`   Method1: ${r.method1.toFixed(3)}ms | Method2: ${r.method2.toFixed(3)}ms | Diff: ${r.diff}%`);
});

// 통계
const method1Wins = results.filter(r => r.winner === "Method 1").length;
const method2Wins = results.filter(r => r.winner === "Method 2").length;

console.log("\n" + "=".repeat(80));
console.log("🏆 최종 승자:");
console.log(`   Method 1 (Sort):   ${method1Wins}승 🔴`);
console.log(`   Method 2 (Bucket): ${method2Wins}승 🔵`);
console.log("=".repeat(80));

// 결론
console.log("\n💡 결론:");
if (method2Wins > method1Wins) {
    console.log("   Bucket Sort가 대부분의 경우 더 빠릅니다!");
    console.log("   특히 배열이 클수록 성능 차이가 명확합니다.");
} else if (method1Wins > method2Wins) {
    console.log("   Sort가 대부분의 경우 더 빠릅니다!");
    console.log("   작은 배열이나 높은 unique ratio에서 유리합니다.");
} else {
    console.log("   두 방법의 성능이 비슷합니다!");
}
