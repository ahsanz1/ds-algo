const subsetSumEqualsTarget = require("./subsetSumEqualsTarget");

function sum(arr) {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

const arr = [2, 3, 3, 3, 4, 5];
let totalSum = sum(arr);

const partitionEqualSubsetSum = () => {
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;

  return subsetSumEqualsTarget(5, target, arr);
};

console.log(partitionEqualSubsetSum());
