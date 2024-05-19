/**
 * QUESTION: Given an array of N integers, check if the array can be partitioned into 2 subsets
 * such that the sum of both subsets is equal.
 */


const subsetSumEqualsTarget = require("./subsetSumEqualsTarget");

function sum(arr) {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

/**
 * NOTE: We have to check if we can form exactly 2 subsets with equal sum!
 * totalSum S = S1 + S2
 * If both subsets have equal sum S1 = S2, then S1 = S2 = S / 2
 * If S is odd, then division is not possible because you cannot have an odd sum divided into
 * 2 subsets with equal sum!
 * 
 * So, we have to check if we can get a subset / subseq with sum S / 2
 * If a subset is giving you sum S / 2, then remaining elements are bound to give you a Sum S - S / 2 = S / 2
 */

const arr = [2, 3, 3, 3, 4, 5];
let totalSum = sum(arr);

const partitionEqualSubsetSum = () => {
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;

  return subsetSumEqualsTarget(5, target, arr);
};

console.log(partitionEqualSubsetSum());
