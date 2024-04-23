/**
 * QUESTION: Given an array of stock prices on a particular day, tell the max profit you can
 * achieve by buying & selling stock. You can buy & sell any number of times BUT you must have
 * bought stock before you sell it. You cannot do buy buy & sell sell. There's a transaction FEE
 * attached to each transaction.
 *
 * f(0,1) signifies that starting on 0th day with buy = 1, what max profit can be generated.
 * const prices = [7, 1, 5, 3, 6, 4];
 * If we buy on 0th day & sell on 2nd day -> 5 - 7 -> means when you buy you add -7 & when you sell you +5
 *
 * Base Cae -> i === n -> you have exahusted the days, it doesn't matter whether buy=1 or buy=0
 * you cannot make any profit now so return 0
 *
 * TC -> 2^n, SC -> O(n) -> ASS
 * TC -> O(N x 2), SS -> O(n) + O(N x 2)
 */

const prices = [7, 1, 5, 3, 6, 4];
const n = prices.length;
const tf = 2;

const bestTimeToBuyAndSellStocks2 = (i, buy) => {
  if (i === n) return 0;

  let profit = 0;
  if (buy) {
    const take = -prices[i] + bestTimeToBuyAndSellStocks2(i + 1, 0);
    const notTake = 0 + bestTimeToBuyAndSellStocks2(i + 1, 1);
    profit = Math.max(take, notTake);
  } else {
    const take = prices[i] - tf + bestTimeToBuyAndSellStocks2(i + 1, 1);
    const notTake = 0 + bestTimeToBuyAndSellStocks2(i + 1, 0);
    profit = Math.max(take, notTake);
  }
  return profit;
};

// DP Array of N x 2 -> no. of states
const dpArr = new Array(n).fill(-1).map(() => new Array(2).fill(-1));

const bestTimeToBuyAndSellStocks2DP = (i, buy) => {
  if (i === n) return 0;

  if (dpArr[i][buy] !== -1) return dpArr[i][buy];

  let profit = 0;
  if (buy) {
    const take = -prices[i] + bestTimeToBuyAndSellStocks2(i + 1, 0);
    const notTake = 0 + bestTimeToBuyAndSellStocks2(i + 1, 1);
    profit = Math.max(take, notTake);
    dpArr[i][buy] = profit;
  } else {
    const take = prices[i] - tf + bestTimeToBuyAndSellStocks2(i + 1, 1);
    const notTake = 0 + bestTimeToBuyAndSellStocks2(i + 1, 0);
    profit = Math.max(take, notTake);
    dpArr[i][buy] = profit;
  }
  return dpArr[i][buy];
};

const dpTabulation = new Array(n + 1).fill(-1).map(() => new Array(2).fill(-1));

const bestTimeToBuyAndSellStocks2Tabulation = () => {
  dpTabulation[n][0] = 0;
  dpTabulation[n][1] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      if (buy) {
        const take = -prices[i] + dpTabulation[i + 1][0];
        const notTake = 0 + dpTabulation[i + 1][1];
        profit = Math.max(take, notTake);
        dpTabulation[i][buy] = profit;
      } else {
        const take = prices[i] - tf + dpTabulation[i + 1][1];
        const notTake = 0 + dpTabulation[i + 1][0];
        profit = Math.max(take, notTake);
        dpTabulation[i][buy] = profit;
      }
    }
  }
  return dpTabulation[0][1]; //because top-down/bottom-up we're making our way up from end to top
};

console.log(bestTimeToBuyAndSellStocks2(0, 1));
console.log(bestTimeToBuyAndSellStocks2DP(0, 1));
console.log(bestTimeToBuyAndSellStocks2Tabulation());
console.log(dpTabulation);
