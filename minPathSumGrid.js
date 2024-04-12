const arr = [
  [1, 2, 3],
  [4, 100, 5],
  [7, 8, 9],
];

const dpArr = [];

for (let i = 0; i < arr.length; i++) {
  dpArr[i] = new Array(arr[i].length).fill(-1);
}

/**
 * Try out all paths -> recursion & out of those all paths tell me the minimum cost one
 * f(i,j) will give the minimal cost for reaching from (0,0) to (i,j)
 */

const minPathSumGrid = (i, j) => {
    /**
     * If you have reached (0,0) then arr[0][0] will ofcourse amount to your cost
     */
  if (i === 0 && j === 0) return arr[i][j];
  /**
   * In min value problems, if we don't want to consider a path we return MAX possible answer so that
   * the answer does not get considered when taking a min (max cost gets associated with the path)
   */
  if (i < 0 || j < 0) return Infinity;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  /**
   * Take up (i,j)'s const & go up
   */
  const up = arr[i][j] + minPathSumGrid(i - 1, j);
  /**
   * Take up (i,j)'s const & go left
   */
  const left = arr[i][j] + minPathSumGrid(i, j - 1);

  const min = Math.min(up, left);
  dpArr[i][j] = min;
  return min;
};

console.log(minPathSumGrid(2, 2));
console.log(JSON.stringify(dpArr, null, 10));
