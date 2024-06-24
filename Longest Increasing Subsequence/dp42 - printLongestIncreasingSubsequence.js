/**
 * [5, 4, 11, 1, 16, 8]
 * [1, 1,  2, 1, 3,  2] //[1,1,1,1,1,1] (initially) -> min length of lis till each idx
 * [0, 1,  0, 3, 2, 0] //[0,1,2,3,4,5] (initially) -> will tell the prev indexes
 *
 * If arr[i] is part of subsequence then prevlength + length of arr[i]. We will get the idx till where
 * we can get the max length of lis, now backtrack! In this case 4 -> 2 -> 0 -> [5,11,16]
 */

const arr = [5, 4, 11, 1, 16, 8];
const n = arr.length;

const dpPrint = new Array(n).fill(1);
const hash = new Array(n);
const lisPrint = () => {
  let maxi = 1;
  let lastIndex = 0;
  const lis = [];
  for (let i = 0; i <= n; i++) {
    hash[i] = i;
    for (let prevIdx = 0; prevIdx < i; prevIdx++) {
      if (arr[prevIdx] < arr[i] && 1 + dpPrint[prevIdx] > dpPrint[i]) {
        dpPrint[i] = 1 + dpPrint[prevIdx];
        hash[i] = prevIdx;
      }
    }
    if (dpPrint[i] > maxi) {
      maxi = dpPrint[i];
      lastIndex = i;
    }
  }
  lis.push(arr[lastIndex]);
  while (hash[lastIndex] !== lastIndex) {
    lastIndex = hash[lastIndex];
    lis.push(arr[lastIndex]);
  }

  return lis.reverse();
};

console.log(lisPrint())
