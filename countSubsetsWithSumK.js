/**
 * Here f(n-1, S) represents that in the entire array, how many subsequences are there that will
 * give you the sum S.
 * pick & notPick each will give you some subsequences that have a sum = target, add them!
 */

const arr = [1, 2, 2, 4];
const target = 3;

/**
 * Always fill dpArr with -1 in recursive solution & with 0 during tabulation for counting problems
 */

const dpArr = new Array(arr.length)
  .fill(-1)
  .map(() => new Array(target + 1).fill(0));

const countSubsequencesWithSumK = (index, target) => {
  if (target === 0) return 1;

  if (index === 0)
    if (arr[index] === target) return 1;
    else if (arr[index] === 0 && target === 0) return 2;
    else return 0;

  if (dpArr[index][target] !== -1) return dpArr[index][target];

  const notPick = countSubsequencesWithSumK(index - 1, target);
  let pick = 0;

  if (arr[index] <= target)
    pick = countSubsequencesWithSumK(index - 1, target - arr[index]);

  dpArr[index][target] = pick + notPick;

  return pick + notPick;
};

const countSubsequencesWithSumKtabulation = (arr = [], target = 0) => {
  for (let i = 0; i < arr.length; i++) dpArr[i][0] = 1;
  if (arr[0] <= target) dpArr[0][arr[0]] = 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j <= target; j++) {
      const notPick = dpArr[i - 1][j];
      let pick = 0;
      if (arr[i] <= j) pick = dpArr[i - 1][j - arr[i]];
      dpArr[i][j] = pick + notPick;
    }
  }
  return dpArr[arr.length - 1][target];
};

console.log(countSubsequencesWithSumK(3, 3));
console.log(countSubsequencesWithSumKtabulation(arr, 3));
console.log(dpArr);
