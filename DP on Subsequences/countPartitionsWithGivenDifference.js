const arr = [5, 2, 6, 4];
const dpArr = [];
let target = 0;

const countSubsequencesWithSumK = (index, target) => {
  if (target === 0) return 1;

  if (index === 0)
    if (arr[index] === target) return 1;
    else return 0;

  if (dpArr[index][target] !== -1) return dpArr[index][target];

  const notPick = countSubsequencesWithSumK(index - 1, target);
  let pick = 0;

  if (arr[index] <= target)
    pick = countSubsequencesWithSumK(index - 1, target - arr[index]);

  console.log("Pick: ", pick, "NotPick: ", notPick);

  dpArr[index][target] = pick + notPick;

  return pick + notPick;
};

function sum(arr) {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

const countPartitionsWithGivenDifference = (arr = [], difference = 0) => {
  const totalSum = sum(arr);
  /**
   * S1 - S2 = D
   * S1 = TotalSum - S2
   * TotalSum - S2 - S2 = D
   * S2 = (TotalSum - D) / 2
   *
   * We are looking for subsets which have sum as per the above formula. We have just modified the target for
   * countSubsequencesWithSumK problem.
   *
   * Edge Cases -> TotalSum - D should be a +ve number because sum of +ve integers cannot be a -ve number!
   * TotalSum - D / 2 should be an integer!
   *
   */
  target = (totalSum - difference) / 2;

  for (let i = 0; i < arr.length; i++) {
    dpArr[i] = new Array(target + 1).fill(-1);
  }

  if (totalSum - difference < 0 || (totalSum - difference) % 2) {
    return 0;
  }

  return countSubsequencesWithSumK(arr.length - 1, target);
};

console.log(countPartitionsWithGivenDifference(arr, 3));
