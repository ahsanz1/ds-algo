/**
 * QUESTION: You will be given a rod length N & an array of prices which you can get by cutting the rod
 * into pieces of different lengths. Each index represents the rod length. What's the maximum price that
 * you can get by cutting the rod into different lengths?
 *
 * Collect differnt lengths to make N -> Similar to unbounded knapsack.
 * f(n-1, N) -> Till n - 1 what's the max price that you can get in order to make N.
 * Base Case -> On index 0, rodlength is 1 so you'll require N rods of length 1 in order to make N
 * so you return N x price[0]
 */

const prices = [2, 5, 7, 8, 10];
const N = prices.length;

const rodCutting = (index, N) => {
  if (index === 0) {
    return N * prices[0];
  }

  const notTake = rodCutting(index - 1, N);
  let take = -Infinity;
  const rodLength = index + 1;
  if (rodLength <= N) take = prices[index] + rodCutting(index, N - rodLength);

  return Math.max(notTake, take);
};

const dpArr = new Array(N).fill(-1).map(() => new Array(N + 1).fill(-1));

const rodCuttingDP = (index, N) => {
  if (index === 0) {
    return N * prices[0];
  }

  if (dpArr[index][N] !== -1) return dpArr[index][N];

  const notTake = rodCutting(index - 1, N);
  let take = -Infinity;
  const rodLength = index + 1;
  if (rodLength <= N) take = prices[index] + rodCutting(index, N - rodLength);

  dpArr[index][N] = Math.max(notTake, take);
  return dpArr[index][N];
};

const dpTabulation = new Array(N).fill(-1).map(() => new Array(N + 1).fill(-1));

const rodCuttingTabulation = () => {
  for (let n = 0; n <= N; n++) {
    dpTabulation[0][n] = n * prices[0];
  }

  for (let i = 1; i <= N - 1; i++) {
    for (let n = 0; n <= N; n++) {
      const notTake = dpTabulation[i - 1][n];
      let take = -Infinity;
      const rodLength = i + 1;
      if (rodLength <= n) take = prices[i] + dpTabulation[i][n - rodLength];

      dpTabulation[i][n] = Math.max(notTake, take);
    }
  }
  return dpTabulation[N - 1][N];
};

console.log(rodCutting(N - 1, N));
console.log(rodCuttingDP(N - 1, N));
console.log(rodCuttingTabulation());
