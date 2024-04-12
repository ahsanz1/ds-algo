const arr = [
  //   [2, 1, 3],
  //   [3, 4, 6],
  //   [10, 1, 6],
  //   [8, 3, 7],
  [1, 2, 5],
  [3, 1, 1],
  [3, 3, 3],
];

const dpArr = [];

for (let i = 0; i < arr.length; i++) {
  dpArr[i] = new Array(4).fill(-1);
}

const maxMeritPointsForNinja = (day, last) => {
  if (day === 0) {
    let max = 0;
    for (let i = 0; i < arr[day].length; i++) {
      if (i !== last) {
        max = Math.max(arr[day][i], max);
      }
    }
    return max;
  }

  if (dpArr[day][last] !== -1) return dpArr[day][last];

  let max = 0;

  for (let i = 0; i < arr[day].length; i++) {
    if (i !== last) {
      const points = arr[day][i] + maxMeritPointsForNinja(day - 1, i);
      max = Math.max(points, max);
    }
  }
  dpArr[day][last] = max;
  return dpArr[day][last];
};

console.log(maxMeritPointsForNinja(arr.length - 1, 3), dpArr);
