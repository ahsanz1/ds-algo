/**
 * QUESTION: Given an array of stock prices on a particular day, tell the max profit you can
 * achieve by buying & selling stock. You can buy & sell 2 times only BUT you must have
 * bought stock before you sell it. You cannot do buy buy & sell sell.
 *
 * Base Case -> i === n -> you have exahusted the days, it doesn't matter whether buy=1 or buy=0
 * you cannot make any profit now so return 0, cap === 0 -> you have exhausted the number of times
 * you can buy & sell
 *
 * TC -> 2^n, SC -> O(n) -> ASS
 * TC DP -> O(N x 2 x 3), SS -> O(n) + O(N x 2 x 3) -> 2 states for buy value & 3 states for cap value
 */

const prices = [3, 3, 5, 0, 0, 3, 1, 4];
const n = prices.length;

const bestTimeToBuyAndSellStocks3 = (i, buy, cap) => {
  if (cap === 0) return 0;
  if (i === n) return 0;

  let profit = 0;
  if (buy) {
    const take = -prices[i] + bestTimeToBuyAndSellStocks3(i + 1, 0, cap);
    const notTake = 0 + bestTimeToBuyAndSellStocks3(i + 1, 1, cap);
    profit = Math.max(take, notTake);
  } else {
    const take = prices[i] + bestTimeToBuyAndSellStocks3(i + 1, 1, cap - 1);
    const notTake = 0 + bestTimeToBuyAndSellStocks3(i + 1, 0, cap);
    profit = Math.max(take, notTake);
  }
  return profit;
};

// DP Array of N x 2 x 3 -> no. of states
const dpArr = new Array(n)
  .fill(null)
  .map(() => new Array(2).fill(null).map(() => new Array(3).fill(-1)));

const bestTimeToBuyAndSellStocks3DP = (i, buy, cap) => {
  if (cap === 0) return 0;
  if (i === n) return 0;

  if (dpArr[i][buy][cap] !== -1) return dpArr[i][buy][cap];

  let profit = 0;
  if (buy) {
    const take = -prices[i] + bestTimeToBuyAndSellStocks3DP(i + 1, 0, cap);
    const notTake = 0 + bestTimeToBuyAndSellStocks3DP(i + 1, 1, cap);
    profit = Math.max(take, notTake);
    dpArr[i][buy][cap] = profit;
  } else {
    const take = prices[i] + bestTimeToBuyAndSellStocks3DP(i + 1, 1, cap - 1);
    const notTake = 0 + bestTimeToBuyAndSellStocks3DP(i + 1, 0, cap);
    profit = Math.max(take, notTake);
    dpArr[i][buy][cap] = profit;
  }
  return dpArr[i][buy][cap];
};

const dpTabulation = new Array(n + 1)
  .fill(null)
  .map(() => new Array(2).fill(null).map(() => new Array(3).fill(0)));

const bestTimeToBuyAndSellStocks3Tabulation = () => {
  for (let i = 0; i <= n; i++)
    for (let j = 0; j <= 1; j++) dpTabulation[i][j][0] = 0;

  for (let buy = 0; buy <= 1; buy++)
    for (let cap = 0; cap <= 2; cap++) dpTabulation[n][buy][cap] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      for (let cap = 1; cap <= 2; cap++) {
        let profit = 0;
        if (buy === 1) {
          const take = -prices[i] + dpTabulation[i + 1][0][cap];
          const notTake = 0 + dpTabulation[i + 1][1][cap];
          profit = Math.max(take, notTake);
          dpTabulation[i][buy][cap] = profit;
        } else {
          const take = prices[i] + dpTabulation[i + 1][1][cap - 1];
          const notTake = 0 + dpTabulation[i + 1][0][cap];
          profit = Math.max(take, notTake);
          dpTabulation[i][buy][cap] = profit;
        }
      }
    }
  }
  return dpTabulation[0][1][2];
  //because top-down/bottom-up we're making our way up from end to top
  //This is where the initial recursion call was made from! Answer will eventually accumulate here.
};

console.log(bestTimeToBuyAndSellStocks3(0, 1, 2));
console.log(bestTimeToBuyAndSellStocks3DP(0, 1, 2));
console.log(bestTimeToBuyAndSellStocks3Tabulation());
console.log(dpTabulation);
