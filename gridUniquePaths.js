const arr = [
  [1, 2, 3],
  [4, -1, 5],
  [7, 8, 9],
];

const dpArr = [];

for (let i = 0; i < arr.length; i++) {
  dpArr[i] = new Array(arr[i].length).fill(-1);
}

const gridUniquePaths = (i, j) => {
  if (i == 0 && j === 0) return 1;
  if (i < 0 || j < 0) return 0;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  const up = gridUniquePaths(i - 1, j);
  const left = gridUniquePaths(i, j - 1);

  dpArr[i][j] = up + left;
  return dpArr[i][j];
};

const gridUniquePathsDeadCell = (i, j) => {
  if (i == 0 && j === 0) return 1;
  if (i < 0 || j < 0) return 0;
  if (arr[i][j] === -1) return 0;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  const up = gridUniquePathsDeadCell(i - 1, j);
  const left = gridUniquePathsDeadCell(i, j - 1);

  dpArr[i][j] = up + left;
  return dpArr[i][j];
};

console.log(gridUniquePathsDeadCell(2, 2));
console.log(dpArr);
