/**
 * QUESTION: You are given a targetSum & an array which denotes the denomination of coins. In how many ways can
 * we form targetSum. Each coin can be taken more than once.
 * Greedy fails becaouse there is no uniformity among the differences between coins, e.g
 * {9, 6, 5, 1}, target = 11 -> 11/9 = 1 denomination of 9, 2/1 = 2 denominations of 1 -> 3 coins.
 * BUT 6 + 5 = 11 -> 2 coins!
 * We cannot predict what the next denomination will be. So greedy cant be applied.
 * We'll try out all combos & take the combo that has minimum coins.
 *
 * f(n-1, T) means in how many ways can we form target T till index n-1s
 * One coin can be used multiple times here, so there's infinite supply of coins! We cannot just divide
 * & use like if T = 25 & there's a coin of 3 denomination -> 25 / 3 = 8. We can use 8 denominations of
 * 3 BUT we don't have to! We could use 6 denominations of 3 & 1 denomination of 7 (if present) as well!
 *
 * Whenever there's infinite supply / multiple use statements, in the take case you always stay at the same index
 * & try to reduce the target as much as you can. If you move an index back, you won't be able to pick that element
 * multiple times.
 *
 * Base Case -> If we're starting from n-1, we write base case at 0. Think about a single array containing single
 * element & a possible target.
 *
 * TC -> NOT exactly O(2^n) because at each step we're not always moving to next index, we stay at same index till
 * that denomination is less than target, so TC is exponential for sure
 * SC -> Not exactly O(n) because at each step we're not always moving to next index, we stay at same index till
 * that denomination is less than target, so SC could be O(target) assuming at each step we reduce the target by 1
 * Memoized TC -> O(n x T), SC -> O(n x T) + O(T)
 */

const coins = [1, 2, 3];
const target = 8;
const n = coins.length;

const minimumCoins2 = (index, T) => {
  if (index === 0) {
    /**
     * At index 0 we can only pick up the coin if the target is divisible by that denomination.
     * T / coins[0] will give the no. of coins of that denomination we need to pick.
     */
    if (T % coins[0] === 0) return 1;
    else return 0;
  }

  const notTake = 0 + minimumCoins2(index - 1, T);
  let take = 0;
  /**
   * We can only pick up a coin as long as that denomination is less than or equal to T.
   * Since there's infinite supply of coins, after picking we stay at that index, T gets reduced
   * & now we try to pick that denomination again & try to further reduce the target as much as we can.
   */
  if (coins[index] <= T) take = 1 + minimumCoins2(index, T - coins[index]);

  return notTake + take;
};

const dpArr = new Array(n).fill(-1).map(() => new Array(target + 1).fill(-1));

const minimumCoins2DP = (index, T) => {
  if (index === 0) {
    if (T % coins[0] === 0) return 1;
    else return 0;
  }

  if (dpArr[index][T] !== -1) return dpArr[index][T];

  const notTake = 0 + minimumCoins2DP(index - 1, T);
  let take = 0;
  if (coins[index] <= T) take = 1 + minimumCoins2DP(index, T - coins[index]);

  dpArr[index][T] = take + notTake;
  return dpArr[index][T];
};

const dpTabulation = new Array(n)
  .fill(-1)
  .map(() => new Array(target + 1).fill(-1));

const minimumCoins2Tabulation = () => {
  for (let t = 0; t <= target; t++) {
    if (t % coins[0] === 0) dpTabulation[0][t] = 1;
    else dpTabulation[0][t] = 0;
  }

  for (let i = 1; i <= n - 1; i++) {
    for (let t = 0; t <= target; t++) {
      const notTake = 0 + dpTabulation[i - 1][t];
      let take = 0;
      if (coins[i] <= t) take = 1 + dpTabulation[i][t - coins[i]];

      dpTabulation[i][t] = notTake + take;
    }
  }
  return dpTabulation[n - 1][target];
};

console.log(minimumCoins2(n - 1, target));
console.log(minimumCoins2DP(n - 1, target));
console.log(minimumCoins2Tabulation());
