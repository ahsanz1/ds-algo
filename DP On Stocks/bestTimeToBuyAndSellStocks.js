/**
 * QUESTION: Given an array of stock prices on a particular day, tell the max profit you can
 * achieve by buying & selling stock. You can only buy once & sell once!
 *
 * NOTE: If you sell stock on ith day, you buy on the min price from 0 to i-1
 */

const prices = [7, 1, 5, 3, 6, 4];

const maxProfit = () => {
  let maxProfit = 0;
  let min = prices[0];

  for (let i = 0; i < prices.length; i++) {
    const profit = prices[i] - min; //What's the profit if you sell on ith day.
    maxProfit = Math.max(maxProfit, profit);
    /**
     * NOTE: Every time you sell, you must have bought on a day when price was minimum, that's why
     * we keep updating the min
     */
    min = Math.min(min, prices[i]);
  }

  return maxProfit;
};

console.log("Max Profit Is: ", maxProfit());
