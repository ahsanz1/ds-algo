/**
 * f(i,j) => max path sum from (i,j) to last row (n-1)
 *
 * Base Case => If you're on (n-1)th row -> destination, whatever value's there (regardless of col)
 * will simply get added to the answer
 * Ignore out of bound return values
 *
 * Explore All => Current value + go & find value for (i+1,j-1)
 *             => Current value + go & find value for (i+1,j+1)
 *             => Current value + go & find value for (i+1,j)
 *
 * Return max of all 3
 *
 * DP -> dp[n][m], max value of i,j can be n rows & m cols so need a dp array of n x m
 */

const arr = [
  [1, 2, 10, 4],
  [100, 3, 2, 1],
  [1, 1, 20, 2],
  [1, 2, 2, 1],
];

const n = arr.length;
const m = arr[0].length;
const dpArr = [];

for (let i = 0; i < arr.length; i++) {
  dpArr[i] = new Array(arr[i].length).fill(-1);
}

const maxFallingPathSum = (i, j) => {
  /**
   * Always write out of bound base case 1st
   */
  if (j < 0 || j > m - 1) return -Infinity;
  if (i === n - 1) return arr[i][j];

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  const leftDiag = arr[i][j] + maxFallingPathSum(i + 1, j - 1);
  const rightDiag = arr[i][j] + maxFallingPathSum(i + 1, j + 1);
  const down = arr[i][j] + maxFallingPathSum(i + 1, j);
  const max = Math.max(leftDiag, rightDiag, down);

  dpArr[i][j] = max;

  return max;
};

console.log(maxFallingPathSum(0, 1));
