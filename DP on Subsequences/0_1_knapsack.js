const weight = [3, 2, 5];
const value = [20, 10, 60];
const W = 6;

const dpArr = new Array(weight.length)
  .fill(-1)
  .map(() => new Array(W + 1).fill(-1));

/**
 * f(n-1, W) signifies that till index n-1, what max value can I get if I have a bag
 * that has weight W
 * On index 0, I can only take the item if weight of that item is less than or equal to the weight of the bag
 */

const knapsack_0_1 = (i, wt) => {
  if (i === 0) {
    if (weight[0] <= wt) return value[0];
    return 0;
  }
  if (dpArr[i][wt] !== -1) return dpArr[i][wt];

  const notTake = knapsack_0_1(i - 1, wt);
  let take = -Infinity;
  if (weight[i] <= wt) take = value[i] + knapsack_0_1(i - 1, wt - weight[i]);

  dpArr[i][wt] = Math.max(notTake, take);
  return dpArr[i][wt];
};

console.log(knapsack_0_1(weight.length - 1, W));

const knapsack_0_1_tabulation = () => {
  /**
   * On index 0, as long as weight value is less than W, we can take value[0] item
   */
  for (let i = weight[0]; i < W; i++) dpArr[0][i] = value[0];

  for (let i = 1; i < weight.length; i++) {
    for (let w = 0; w < W; w++) {
      const notTake = dpArr[i - 1][w];
      let take = -Infinity;
      if (weight[i] <= w) take = value[i] + dpArr[i - 1][w - weight[i]];

      dpArr[i][w] = Math.max(notTake, take);
    }
  }
  return dpArr[weight.length - 1][W];
};

console.log(knapsack_0_1_tabulation());
