/**
 * QUESTION: You will be given an array & a number K. You have to partition the array such that you get maximum sum.
 * Partition length cannot exceed K. Every time you find max in a partition, each element in the partition changes to
 * max for that partition.
 *
 * Try out all possible partitions & pick the best one. All parttions -> Recursion.
 *
 * f(index) -> give me the max sum that can be generated from that index till end.
 * Try out all partitions from that index. Make a partition & the rest of the portion can solve itself.
 * When do you stop? You stop creating partitions when you're crossing the kth partition from that index (idx + k)
 * (idx + k) might exceed the last index so continue till whatever's the minimum idx + k or n.
 *
 * TC -> Exponential
 * TC -> N x k (inner loop that runs k times)
 * SC -> N + N (ASS)
 *
 */

const arr = [1, 15, 7, 9, 2, 5, 10];
const n = arr.length;
const k = 3;

const partitionArrMaxSum = (ind) => {
  if (ind === n) return 0;

  let len = 0;
  let max = -Infinity;
  let maxAns = -Infinity;

  /**
   * On every index, you have to generate all possible partitions till length k, find sum of each partition & pick the max one.
   * Recursion will do the same on every idx value it is passed & will keep updating the maximumSum that can be generated by taking
   * the max element from each partition, converting each element to tha max one & then doing len x max.
   */

  for (let j = ind; j < Math.min(ind + k, n); j++) {
    len++;
    max = Math.max(max, arr[j]);
    /**
     * Every partition changes each of its element to the max value
     */
    const sum = max * len + partitionArrMaxSum(j + 1);
    maxAns = (maxAns, sum);
  }

  return maxAns;
};

const dp = new Array(n).fill(-1);

const partitionArrMaxSumDP = (ind) => {
  if (ind === n) return 0;

  if (dp[ind] !== -1) return dp[ind];

  let len = 0;
  let max = -Infinity;
  let maxAns = -Infinity;

  /**
   * On every index, you have to generate all possible partitions till length k, find sum of each partition & pick the max one.
   * Recursion will do the same on every idx value it is passed & will keep updating the maximumSum that can be generated by taking
   * the max element from each partition, converting each element to tha max one & then doing len x max.
   */

  for (let j = ind; j < Math.min(ind + k, n); j++) {
    len++;
    max = Math.max(max, arr[j]);
    /**
     * Every partition changes each of its element to the max value
     */
    const sum = max * len + partitionArrMaxSum(j + 1);
    maxAns = Math.max(maxAns, sum);
  }

  dp[ind] = maxAns;
  return dp[ind];
};

const dpTab = new Array(n + 1).fill(-1);

const partitionArrMaxSumTab = () => {
  dpTab[n] === 0;

  for (let ind = n - 1; ind >= 0; ind--) {
    let len = 0;
    let max = -Infinity;
    let maxAns = -Infinity;
    for (let j = ind; j < Math.min(ind + k, n); j++) {
      len++;
      max = Math.max(max, arr[j]);
      const sum = max * len + dpTab[j + 1];
      maxAns = Math.max(maxAns, sum);
    }
    dpTab[ind] = maxAns;
  }
  return dpTab[0];
};

console.log(partitionArrMaxSum(0));
console.log(partitionArrMaxSumDP(0));
console.log(partitionArrMaxSumTab());
console.log(dpTab)