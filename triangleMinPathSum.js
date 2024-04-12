/**
 * Fixed starting point, variable ending point as we have to start from 0,0 & reach last row.
 * Last row can have any no. of columns & (n-1, m-1) to (0,0) approach should not be applied here
 * because then there would be [col] no. of recurrences from [row] to (0,0). So these type of problems
 * should be started from (0,0) to (n-1, m-1) (last row) as we have a fixed starting point & we can work our
 * way down to the row (any col) -> preferable logic
 *
 * f(0,0) -> min path sum from (0,0) to last row (any col)
 *
 * Base Case -> If you're on (n-1)th row -> destination, whatever value's there (regardless of col)
 * will simply get added to the answer
 *
 * Explore All -> Current value + go & find value for (i+1,j)
 *             -> Current value + go & find value for (i+1,j+1)
 * Return min of both
 * TC -> 2^n where n is no.of cols, we have 2 choices on each col
 * SC -> n -> recursion stack space
 * DP -> dp[n][m], max value of i,j can be n rows & m cols so need a dp array of n x m
 * TC - DP -> nxn
 * TC - DP -> recursion stack space
 */

const arr = [[1], [2, 3], [3, 6, 7], [8, 9, 6, 10]];
const n = arr.length;
const dpArr = [];

for (let i = 0; i < arr.length; i++) {
  dpArr[i] = new Array(arr[i].length).fill(-1);
}

const triangleMinPathSum = (i, j) => {
  if (i === n - 1) return arr[i][j];

  /**
   * No other base case like going out of bounds as the input is a right angled triangle & we can only go down or
   * diagonally. On a right angled triangle with these contraints & as per problem statement we cannot go out of bounds,
   * That is why we dont have a base case where we return -Infinity or Infinity to ignore the value returned.
   */

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  const down = arr[i][j] + triangleMinPathSum(i + 1, j);
  const diagonal = arr[i][j] + triangleMinPathSum(i + 1, j + 1);

  dpArr[i][j] = Math.min(down, diagonal);
  return dpArr[i][j];
};

console.log(triangleMinPathSum(0, 0));
