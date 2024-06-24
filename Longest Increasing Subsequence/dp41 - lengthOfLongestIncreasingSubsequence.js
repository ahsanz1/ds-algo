// const arr = [10, 9, 2, 5, 3, 7, 101, 18];
const arr = [5, 4, 11, 1, 16, 8];
const n = arr.length;

const lengthOfLongestIncreasingSubsequence = (i, prevIdx) => {
  if (i === n) return 0;

  let take = 0;
  if (prevIdx === -1 || arr[i] > arr[prevIdx])
    take = 1 + lengthOfLongestIncreasingSubsequence(i + 1, i);
  const notTake = lengthOfLongestIncreasingSubsequence(i + 1, prevIdx);

  return Math.max(take, notTake);
};

/**
 * We'll perform 1 based indexing to avoid dp[-1] indexes
 */

const dpArr = new Array(n).fill(-1).map(() => new Array(n + 1).fill(-1));

const lengthOfLongestIncreasingSubsequenceDP = (i, prevIdx) => {
  if (i === n) return 0;

  if (dpArr[i][prevIdx + 1] !== -1) return dpArr[i][prev];

  let take = 0;
  if (prevIdx === -1 || arr[i] > arr[prevIdx])
    take = 1 + lengthOfLongestIncreasingSubsequence(i + 1, i);
  const notTake = lengthOfLongestIncreasingSubsequence(i + 1, prevIdx);

  dpArr[i][prevIdx + 1] = Math.max(take, notTake);
  return dpArr[i][prevIdx + 1];
};

//We did shifting of index here to avoid dp[-1]

const dpTabulation = new Array(n + 1)
  .fill(0)
  .map(() => new Array(n + 1).fill(0));

const lengthOfLongestIncreasingSubsequenceTabulation = () => {
  //   for (let prevIdx = 0; prevIdx <= n; prevIdx++) dpTabulation[n][prevIdx] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let prevIdx = i - 1; prevIdx >= -1; prevIdx--) {
      let take = 0;
      if (prevIdx === -1 || arr[i] > arr[prevIdx])
        take = 1 + dpTabulation[i + 1][i + 1];
      const notTake = dpTabulation[i + 1][prevIdx + 1];

      dpTabulation[i][prevIdx + 1] = Math.max(take, notTake);
    }
  }
  return dpTabulation[0][-1 + 1];
};

/**
 * dp[i] represents length of lis till i
 * On each index, the min length of lis is 1 -> the element itself
 * If we calculate the lis till each index & then take the max of dp at the end,
 * this could be another way of calculating lis
 * TC -> n^2
 */

const dp = new Array(n).fill(1);
const lis = () => {
  let maxi = 1;
  for (let i = 0; i < n; i++) {
    for (let prevIdx = 0; prevIdx < i; prevIdx++) {
      if (arr[prevIdx] < arr[i]) dp[i] = Math.max(1 + dp[prevIdx], dp[i]);
    }
    maxi = Math.max(maxi, dp[i]);
  }
  return maxi;
};


console.log(lengthOfLongestIncreasingSubsequence(0, -1));
console.log(lengthOfLongestIncreasingSubsequenceDP(0, -1));
console.log(lengthOfLongestIncreasingSubsequenceTabulation());
console.log(lis());
// console.log(dpTabulation);
