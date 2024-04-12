let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const n = arr.length;
const hashMap = {};

const maxSumOfNonAdjacent = (index) => {
  if (index < 0) return 0;
  if (index === 0) return arr[0];

  if (hashMap[index]) return hashMap[index];

  let pick = 0;
  let notPick = 0;

  /**
   * f(n) -> max sum we can get if we pick a subsequence from 0 to n with no adjacent elements
   */

  /**
   * If I am picking an index, it will be added to sum
   */
  pick = arr[index] + maxSumOfNonAdjacent(index - 2);

  /**
   * If I am not picking an index, nothing will be added to sum.
   * If I am not picking an index, I can pick index - 1. & I am not picking an index when it its adjacent to an index that
   * I picked
   */
  notPick = maxSumOfNonAdjacent(index - 1);

  hashMap[index] = Math.max(pick, notPick);
  return hashMap[index];
};

arr = [2, 3, 2];

const maxSumOfNonAdjacentCircular = (index, houses = []) => {
  if (index < 0) return 0;
  if (index === 0) return houses[0];

  if (hashMap[index]) return hashMap[index];

  let pick = 0;
  let notPick = -Infinity;

  pick = houses[index] + maxSumOfNonAdjacentCircular(index - 2, houses);

  notPick = maxSumOfNonAdjacentCircular(index - 1, houses);

  hashMap[index] = Math.max(pick, notPick);
  return hashMap[index];
};

/**
 * Since house 0 & house n-1 can never be together in answer, the ans will be max of the answers of arrays
 * without each of these houses.
 */

const lArr = [];
const rArr = [];

for (let i = 0; i < arr.length; i++) {
  if (i !== 0) lArr.push(arr[i]);
  if (i !== arr.length - 1) rArr.push(arr[i]);
}

console.log(
  Math.max(
    maxSumOfNonAdjacentCircular(lArr.length - 1, lArr),
    maxSumOfNonAdjacentCircular(rArr.length - 1, rArr)
  )
);
