const print1ToN = (n) => {
  if (n === 0) return;
  print1ToN(n - 1);
  console.log(n);
};

// print1ToN(5);

/**
 * Functional Recursion
 */

const sumN = (n) => {
  if (n === 1) return 1;

  return n + sumN(n - 1);
};

// console.log(sumN(5));

/**
 * Paramterized Recursion
 */

let sum = 0;

const sumNParamd = (n, sum) => {
  if (n === 0) return;

  sum = sum + n;
  return sumNParamd(n - 1, sum);
};

const inputArr = [1, 4, 2, 0, 6, 3];

const reverseArr2Ptr = (arr, l, r) => {
  if (l >= r) return;

  console.log("Left: ", l, "right: ", r);

  let temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;

  reverseArr2Ptr(arr, l + 1, r - 1);
};
// reverseArr2Ptr(inputArr, 0, inputArr.length - 1);
// console.log(inputArr);

const reverseArr1Ptr = (arr, l) => {
  if (l >= arr.length / 2) return;

  let temp = arr[l];
  arr[l] = arr[arr.length - l - 1];
  arr[arr.length - l - 1] = temp;

  reverseArr1Ptr(arr, l + 1);
};

// reverseArr1Ptr(inputArr, 0);
// console.log(inputArr);

const checkPalindrome = (s = "", i) => {
  if (i >= s.length / 2) return true;
  if (s.charAt(i) !== s.charAt(s.length - i - 1)) return false;

  return checkPalindrome(s, i + 1);
};

// console.log(checkPalindrome("madaom", 0));

const n = inputArr.length;

const printAllSubsequences = (i, arr = []) => {
  if (i >= n) {
    console.log("Subsequence: ", arr);
    return;
  }

  arr.push(inputArr[i]);
  printAllSubsequences(i + 1, arr);

  arr.splice(i, 1);

  printAllSubsequences(i + 1, arr);
};

// printAllSubsequences(0, inputArr);

const k = 6;
// const inputArr = [1, 4, 2, 0, 6, 3];

const printAllSubsequencesWithSumK = (i, arr = [], sum = 0) => {
  if (i >= n) {
    if (sum === k) {
      console.log("Subsequence: ", arr);
    }
    return;
  }

  arr.push(inputArr[i]);
  sum = sum + inputArr[i];
  printAllSubsequencesWithSumK(i + 1, arr, sum);

  arr.pop();
  sum = sum - inputArr[i];
  printAllSubsequencesWithSumK(i + 1, arr, sum);
};

// printAllSubsequencesWithSumK(0);

const printAny1SubsequenceWithSumK = (i, arr = [], sum = 0) => {
  if (i >= n) {
    if (sum === k) {
      console.log("Subsequence: ", arr);
      return true;
    } else return false;
  }

  arr.push(inputArr[i]);
  sum = sum + inputArr[i];
  if (printAny1SubsequenceWithSumK(i + 1, arr, sum)) return true;

  arr.pop();
  sum = sum - inputArr[i];
  if (printAny1SubsequenceWithSumK(i + 1, arr, sum)) return true;
  return false;
};

// const inputArr = [1, 4, 2, 0, 6, 3];

const countSubsequencesWithSumK = (i, sum = 0) => {
  if (i >= n) {
    return sum === k ? 1 : 0;
  }

  const l = countSubsequencesWithSumK(i + 1, sum + inputArr[i]);

  const r = countSubsequencesWithSumK(i + 1, sum);

  return l + r;
};

console.log(countSubsequencesWithSumK(0, 0));
