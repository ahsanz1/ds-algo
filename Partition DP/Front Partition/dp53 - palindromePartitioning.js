/**
 * QUESTION: Find minimum partitions required to make each substring palindrome.
 * str = aabb, if we make n-1 partitions, we can be sure that each substring is a palindrome of length 1.
 * str = bababcbadcede
 *
 *
 * f(0) -> Find the min cuts required to make all substrings from 0 - n-1 palindrome.
 * Base Case -> i===n -> when you reach the end, there's no partition.
 *
 * TC -> Exponential
 * TC DP -> N x N(loop)
 * SC DP -> N + N (ASS)
 */

const str = "bababcbadcede";
const n = str.length;

const isPalindrome = (pString) => {
  let i = 0;
  let j = pString.length - 1;
  while (i < j) {
    if (pString[i] !== pString[j]) return false;
    i++;
    j--;
  }
  return true;
};

const palindromePartitioning = (idx) => {
  if (idx === n) return 0;

  let tempStr = "";
  let min = Infinity;
  for (let j = idx; j < n; j++) {
    /**
     * Every time j moves, a new char is added to string like b, ba, bab etc
     */
    tempStr += str[j];
    /**
     * If the string is palindrome, only then you can make the partition.
     */
    if (isPalindrome(tempStr)) {
      const cost = 1 + palindromePartitioning(j + 1);
      min = Math.min(min, cost);
    }
  }
  return min;
};

const dp = new Array(n).fill(-1);

const palindromePartitioningDP = (idx) => {
  if (idx === n) return 0;

  if (dp[idx] !== -1) return dp[idx];

  let tempStr = "";
  let min = Infinity;
  for (let j = idx; j < n; j++) {
    /**
     * Every time j moves, a new char is added to string like b, ba, bab etc
     */
    tempStr += str[j];
    /**
     * If the string is palindrome, only then you can make the partition.
     */
    if (isPalindrome(tempStr)) {
      const cost = 1 + palindromePartitioning(j + 1);
      min = Math.min(min, cost);
    }
  }
  dp[idx] = min;
  return dp[idx];
};

const dpTab = new Array(n).fill(-1);

const palindromePartitioningTab = () => {
  dpTab[n] = 0;
  for (let idx = n - 1; idx >= 0; idx--) {
    let min = Infinity;
    let tempStr = "";
    for (let j = idx; j < n; j++) {
      tempStr += str[j];
      if (isPalindrome(tempStr)) {
        const cost = 1 + dpTab[j + 1];
        min = Math.min(min, cost);
      }
    }
    dpTab[idx] = min;
  }
  return dpTab[0];
};

console.log(palindromePartitioning(0) - 1);
console.log(palindromePartitioningDP(0) - 1);
console.log(palindromePartitioningTab() - 1);
