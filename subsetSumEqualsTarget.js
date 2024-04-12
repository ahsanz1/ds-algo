const arr = [2, 3, 1, 1];
let target = 4;

const dpArr = [];

for (let i = 0; i < 1000; i++) {
  dpArr[i] = new Array(1000).fill(-1);
}

const subsetSumEqualsTarget = (index, target, arr = []) => {
  if (target === 0) return true;

  if (index === 0) return arr[index] === target;

  if (dpArr[index][target] !== -1) return dpArr[index][target];

  const notPick = subsetSumEqualsTarget(index - 1, target, arr);
  let pick = false;

  if (target >= arr[index])
    pick = subsetSumEqualsTarget(index - 1, target - arr[index], arr);

  const result = pick || notPick;
  dpArr[index][target] = result;

  return result;
};

// console.log(subsetSumEqualsTarget(3, 7, arr));

module.exports = subsetSumEqualsTarget;
