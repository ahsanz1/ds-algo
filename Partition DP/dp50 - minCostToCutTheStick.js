/**
 * QUESTION: You will be given a stick length & an array that tells where can you cut the stick. You can follow the
 * cuts in any order. You have to tell
 * the minimum cost to cut the stick -> What order of cuts will give us min cost. Cost is length of the stick you're cutting.
 *
 * On every cut, the cost added is the length of the stick.
 *
 * Sort the array before solving, if the array is sorted then every time we make a cut & divide the array into 2 subproblems,
 * those subproblems can be solved independently. In a sorted array, we can make independent partitions & solve them separately.
 * Consider an arr = [1,3,4,5,2]. If we make a cut at 4,
 * [1,2,3,4,5,6,7]
 * 0 1 2 3 4 5 6 7
 * we'll have [1,2,3] - [5,6,7]
 * & if we have cuts = [1,3,4,5,2]
 * we'll have [1,3] & [5,2] partitions, these are not independent because
 * in 2nd subproblem, if you make a cut at 2 then this will lie in subproblem 1 so these subproblems are not independent.
 *
 * To find the length of the stick for a particular cut, lets say 4
 * For the initial cut, i is at 1 & j at 5 -> f(1,4)
 * [1, 3, 4, 5]
 * 0 [1, 3, 4, 5] 7 -> cuts[j+1] - cuts[i-1] -> right last cut - left last cut
 *
 * You can think of 0 & 7 as 0 is the last portion where you made the cut & 7 is the last point where the cut ended
 *
 * Now you have to solve for the subproblems f(i, ind-1) + f (ind + 1, j)
 *
 * You can start cutting from anywhere, any index! So you'll have to run a loop to implement the scenario of starting the cut
 * from any index. Basically you'll take each cut index as the starting cut.
 *
 * Base Case -> i & j have crossed, so there's notthing to solve return 0. (partition dp pattern)
 *
 * TC -> Trying out all partitions -> Exponential
 * TC DP -> M x M no of states x M no of iterations for each state = M^3, SC = M^2 + ASS
 */

const cuts = [1, 3, 4, 5];
const n = cuts.length;
const stickLength = 7;

cuts.unshift(0);
cuts.push(stickLength);

const minCostToCutTheStick = (i, j) => {
  if (i > j) return 0;

  let min = Infinity;
  for (let ind = i; ind <= j; ind++) {
    const cost =
      cuts[j + 1] -
      cuts[i - 1] +
      minCostToCutTheStick(i, ind - 1) +
      minCostToCutTheStick(ind + 1, j);

    min = Math.min(cost, min);
  }
  return min;
};

const dp = new Array(n + 1)
  .fill(-1)
  .map(() => new Array(n + 1).fill(-1));

const minCostToCutTheStickDP = (
  i,
  j
) => {
  if (i > j) return 0;

  if (dp[i][j] !== -1) return dp[i][j];

  let min = Infinity;
  for (let ind = i; ind <= j; ind++) {
    const cost =
      cuts[j + 1] -
      cuts[i - 1] +
      minCostToCutTheStickDP(
        i,
        ind - 1
      ) +
      minCostToCutTheStickDP(
        ind + 1,
        j
      );

    min = Math.min(cost, min);
  }
  dp[i][j] = min;
  return dp[i][j];
};

const dpTab = new Array(n + 1)
  .fill(-1)
  .map(() => new Array(n + 1).fill(-1));

const minCostToCutTheStickTab = () => {
  for (let i = 0; i <= n; i++)
    for (let j = 0; j <= n; j++)
      if (i > j) {
        dpTab[i][j] = 0;
      }

  for (let i = n; i <= 1; i--) {
    for (let j = 1; j <= n; j++) {
      let min = Infinity;
      for (
        let ind = i;
        ind <= j;
        ind++
      ) {
        const cost =
          cuts[j + 1] -
          cuts[i - 1] +
          dp[i][ind - 1] +
          dp[ind + 1][j];

        min = Math.min(cost, min);
      }
    }
  }
  return dp[1][n]
};

console.log(minCostToCutTheStick(1, n));
console.log(
  minCostToCutTheStickDP(1, n)
);
console.log(minCostToCutTheStickTab());
