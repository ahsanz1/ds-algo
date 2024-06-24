/**
 * Partition DP -> Different paritions of array will give different answers, you have to chose the best partition.
 *
 * QUESTION: Given N matrix dimensions, what's the min cost to multiply them to get a single matrix.
 * arr = [10, 20, 30, 40, 50]
 *            A,  B,  C,  D
 *            1----------n-1
 * ^These are dimenstions of N-1 matrices.
 * A = 10 x 20, B = 20 x 30, C = 30 x 40, D = 40 x 50, so for ith matrix dimensions are A[i-1] x A[i]
 * We need to find the min no. of operations required to multiply these matrices.
 *
 * Rules For Partition DP
 * 1- Start with the complete block / array. i is start point j is ending point.
 * 2- Try all partitions. Run a loop to try all partitions.
 * 3- Return the best possible 2 partitions.
 * f(i, n-1)
 * f(1, 4) -> return the min multiplications required to multiply from matrix 1 to matrix 4.
 * We could have partitions like (A)(BCD), (AB)(CD), (ABC)(D)
 *
 * Base Case -> With each partition, i,j will shrink & we'll have a base case when i == j, for which the ops
 * required are 0
 */

const arr = [10, 20, 30, 40, 50];
const n = arr.length;

const mcm = (i, j) => {
  if (i === j) return 0;

  /**
   * 1st partition will be from i to k & 2nd will be from k+1 to j
   * For (A)(BCD) -> (10 x 20)[(BC)(CD)] = [(20 x 30)(30 x 40)(40 x 50)] = (20 x 40)(40  x 50) = (20 x 50)
   * So (10 x 20)(20 x 50) ->  No of ops required = 10 x 20 x 50
   * [10,   20, 30, 40, 50]
   * (i-1), (k)        (j)
   */
  let min = Infinity;
  for (let k = i; k < j; k++) {
    /**
     * arr[i - 1] * arr[k] * arr[j] signifies that you had 2 parts, when you combine them the number of
     * steps will be this^. mcm(i,k) partition will take some steps mcm(k+1, j) partition will take some
     * steps, give me minimal!
     */
    const steps = arr[i - 1] * arr[k] * arr[j] + mcm(i, k) + mcm(k + 1, j);
    min = Math.min(min, steps);
  }

  return min;
};

const dpArr = new Array(n).fill(-1).map(() => new Array(n).fill(-1));

const mcmDP = (i, j) => {
  if (i === j) return 0;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  let min = Infinity;
  for (let k = i; k < j; k++) {
    const steps = arr[i - 1] * arr[k] * arr[j] + mcmDP(i, k) + mcmDP(k + 1, j);
    min = Math.min(min, steps);
  }

  dpArr[i][j] = min;
  return min;
};

console.log(mcm(1, n - 1));
console.log(mcmDP(1, n - 1));