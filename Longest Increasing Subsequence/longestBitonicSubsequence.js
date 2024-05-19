/**
 * QUESION: Bitonic Subsequence -> a subsequence that is increasing till a certain point & then starts
 * decreasing. It can only be increasing & can only be decreasing as well.
 *
 * INTUITION: If we compute LIS from l -> r -> forward increasing & LIS from l <- r -> backward increasing,
 * dp1[i] will tell the LIS from 0 till i & dp2[i] will tell the LIS from n-1 till i. Here dp[i] is a common
 * element, so LBS will be dp1[i] + dp2[i] - 1 (common will be counted once).
 *
 * Till idx i, we'll have the LIS part of LBS & from n-1 till i (from left) we'll have the LDS part of LBS
 */

const arr = [1, 11, 2, 10, 4, 5, 2, 1];
const n = arr.length;
const dp1 = new Array(n).fill(1);
const dp2 = new Array(n).fill(1);

const longestBitonicSubsequence = () => {
  let maxi = 0;
  for (let i = 0; i < n; i++) {
    for (let prev = 0; prev < i; prev++) {
      if (arr[prev] < arr[i] && 1 + dp1[prev] > dp1[i]) {
        dp1[i] = 1 + dp1[prev];
      }
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let prev = n - 1; prev >= i; prev--) {
      if (arr[prev] < arr[i] && 1 + dp2[prev] > dp2[i]) {
        dp2[i] = 1 + dp2[prev];
      }
    }
  }

  for (let i = 0; i < n; i++) {
    maxi = Math.max(maxi, dp1[i] + dp2[i] - 1);
  }
  return maxi;
};

console.log(longestBitonicSubsequence());
