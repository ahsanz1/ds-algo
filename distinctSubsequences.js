/**
 * QUESTION: How many times string2 appears in string1.
 *
 * babgbag, bag
 *
 * NOTE: There could be multiple ways of comparing str2 with str1, you may want to match 1st b in
 * str2 with 2nd b in str1 > Trying all ways > Recursion
 *
 * str1.length = n, str2.length = m
 * f(i,j) > f(n-1, m-1) represents no. of distinct subsequences of str2[0-j] in str1[0-i]
 *
 * Base Case > If we exhaust str2, it means we have completely matched it, we can return 1.
 * If we exhast str1 while there's still some lenth of str2 is remaining, we should return 1
 * because we were not able to completely match str2 in str1.
 *
 * TC -> 2^n x 2^m because since we're generating & comparing all possible combinations
 * there could be 2^n combinations of str1 which are to be compared with 2^m
 * combinations of str2. For a string of length n 2^n combinations can be generated.
 *
 * SC -> O (N + M)
 *
 * DP TC -> O (n x m) -> no. of states -> because we're filling dp table so n x m operations
 * DP SC -> O (n x m) + O (n + m) -> ASS
 */

const str1 = "babgbag";
const str2 = "bag";
const n = str1.length;
const m = str2.length;

const distinctSubsequenesRecursive = (i, j) => {
  if (j < 0) return 1;
  if (i < 0) return 0;

  if (str1[i] === str2[j]) {
    return (
      distinctSubsequenesRecursive(i - 1, j - 1) +
      distinctSubsequenesRecursive(i - 1, j)
    );
  } else return distinctSubsequenesRecursive(i - 1, j);
};

const dpArr = new Array(n).fill(-1).map(() => new Array(m).fill(-1));

const distinctSubsequenesDP = (i, j) => {
  if (j < 0) return 1;
  if (i < 0) return 0;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  if (str1[i] === str2[j]) {
    dpArr[i][j] =
      distinctSubsequenesRecursive(i - 1, j - 1) +
      distinctSubsequenesRecursive(i - 1, j);
    return dpArr[i][j];
  } else {
    dpArr[i][j] = distinctSubsequenesRecursive(i - 1, j);
  }
};

/**
 * NOTE: Since, we're going to be dealing with dp[-1][j] or dp[i][-1], we will switch to 1
 * based indexing
 */

/**
 * STEPS
 * 1- Declare a DP of size n+1 & m+1
 * 2- Write the base cases
 * 3- Write the changing params in opposite fashion (bottom-up)
 * 4- Copy the recurrence in between
 */

const dpTabulation = new Array(n + 1)
  .fill(0)
  .map(() => new Array(m + 1).fill(0));

const distinctSubsequenesTabulation = () => {
  for (let i = 0; i <= n; i++) dpTabulation[i][0] = 1;

  //We can omit this line as well because we're already initialising everything with 0
//   for (let j = 1; j <= m; j++) dpTabulation[0][j] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        /**
         * NOTE: We're doing 1 based indexing to avoig dp[-1] negative indexes but the actual strings
         * are still 0 based, that's why we compare str1[i-1] & str2[j-1] because i-1 maps to i & j-1
         * maps to j (actual chars) in the string
         */
      if (str1[i - 1] === str2[j - 1]) {
        dpTabulation[i][j] =
          dpTabulation[i - 1][j - 1] + dpTabulation[i - 1][j];
      } else {
        dpTabulation[i][j] = dpTabulation[i - 1][j];
      }
    }
  }
  return dpTabulation[n][m]
};

console.log(distinctSubsequenesRecursive(n - 1, m - 1));
console.log(distinctSubsequenesDP(n - 1, m - 1));
console.log(distinctSubsequenesTabulation())
console.log(dpTabulation)
