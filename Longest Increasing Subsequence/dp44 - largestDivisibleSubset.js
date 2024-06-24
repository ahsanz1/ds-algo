/**
 * QUESTION: arr[i] % arr[j] should be 0 OR arr[j] % arr[i] should be 0 -> in each pair
 * Intuition: If we sort the array then every i+1 should be divisible by i
 * [1,4,8,16] -> 8 is divisible by 4 which is divisble by 1 so 8 is divisible by 1, we just have
 * to add this condition in lisPrint function
 */

const arr = [1, 16, 7, 8, 4];
arr.sort((a, b) => a - b);
const n = arr.length;

const dpPrint = new Array(n).fill(1);
const hash = new Array(n);
const ldsPrint = () => {
  let maxi = 1;
  let lastIndex = 0;
  const lds = [];
  for (let i = 0; i < n; i++) {
    hash[i] = i;
    for (let prevIdx = 0; prevIdx < i; prevIdx++) {
      if (arr[i] % arr[prevIdx] === 0 && 1 + dpPrint[prevIdx] > dpPrint[i]) {
        dpPrint[i] = 1 + dpPrint[prevIdx];
        hash[i] = prevIdx;
      }
    }
    if (dpPrint[i] > maxi) {
      maxi = dpPrint[i];
      lastIndex = i;
    }
  }
  lds.push(arr[lastIndex]);
  while (hash[lastIndex] !== lastIndex) {
    lastIndex = hash[lastIndex];
    lds.push(arr[lastIndex]);
  }

  return lds.reverse();
};

console.log(ldsPrint());
