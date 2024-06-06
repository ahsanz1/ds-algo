/**
 * QUESTION: You are given a targetSum & an array which denotes the denomination of coins. What is the minimum
 * no. of coins that you need in order to form targetSum. Each coin can be taken more than once.
 * Greedy fails becaouse there is no uniformity among the differences between coins, e.g
 * {9, 6, 5, 1}, target = 11 -> 11/9 = 1 denomination of 9, 2/1 = 2 denominations of 1 -> 3 coins.
 * BUT 6 + 5 = 11 -> 2 coins!
 * We cannot predict what the next denomination will be. So greedy cant be applied.
 * We'll try out all combos & take the combo that has minimum coins.
 *
 * f(n-1, T) means what will be the min no. of coins required to form target T till index n-1s
 * One coin can be used multiple times here, so there's infinite supply of coins! We cannot just divide
 * & use like if T = 25 & there's a coin of 3 denomination -> 25 / 3 = 8. We can use 8 denominations of
 * 3 BUT we don't have to! We could use 6 denominations of 3 & 1 denomination of 7 (if present) as well!
 *
 * Whenever there's infinite supply / multiple use statements, in the take case you always stay at the same index
 * & try to reduce the target as much as you can.
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

const minimumCoins = (index, T) => {
  if (index === 0) {
    /**
     * At index 0 we can only pick up the coin if the target is divisible by that denomination.
     * T / coins[0] will give the no. of coins of that denomination we need to pick.
     */
    if (T % coins[0] === 0) return T / coins[0];
    else return Infinity;
  }

  const notTake = 0 + minimumCoins(index - 1, T);
  let take = Infinity;
  /**
   * We can only pick up a coin as long as that denomination is less than or equal to T.
   * Since there's infinite supply of coins, after picking we stay at that index, T gets reduced
   * & now we try to pick that denomination again & try to further reduce the target as much as we can.
   */
  if (coins[index] <= T) take = 1 + minimumCoins(index, T - coins[index]);

  return Math.min(notTake, take);
};

const dpArr = new Array(n).fill(-1).map(() => new Array(target + 1).fill(-1));

const minimumCoinsDP = (index, T) => {
  if (index === 0) {
    if (T % coins[0] === 0) return T / coins[0];
    else return Infinity;
  }

  if (dpArr[index][T] !== -1) return dpArr[index][T];

  const notTake = 0 + minimumCoinsDP(index - 1, T);
  let take = Infinity;
  if (coins[index] <= T) take = 1 + minimumCoinsDP(index, T - coins[index]);

  dpArr[index][T] = Math.min(notTake, take);
  return dpArr[index][T];
};

const dpTabulation = new Array(n)
  .fill(-1)
  .map(() => new Array(target + 1).fill(-1));

const minimumCoinsTabulation = () => {
  for (let t = 0; t <= target; t++) {
    if (t % coins[0] === 0) dpTabulation[0][t] = t / coins[0];
    else dpTabulation[0][t] = Infinity;
  }

  for (let i = 1; i <= n - 1; i++) {
    for (let t = 0; t <= target; t++) {
      const notTake = 0 + dpTabulation[i - 1][t];
      let take = Infinity;
      if (coins[i] <= t) take = 1 + dpTabulation[i][t - coins[i]];

      dpTabulation[i][t] = Math.min(notTake, take);
    }
  }
  return dpTabulation[n - 1][target];
};

console.log(minimumCoins(n - 1, target));
console.log(minimumCoinsDP(n - 1, target));
console.log(minimumCoinsTabulation());
