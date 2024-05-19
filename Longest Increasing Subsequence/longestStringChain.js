/**
 * QUESION: At each index, the last guy should be 1 deletion
 * We have to compare & see if one string is just one char long than the prev one
 * can you form arr[i] by inserting one char into arr[j]
 * 
 * If the question is about SUBSET instead of subsequence then just sort the array based on
 * length & run the same logic
 * 
 * TC -> n^2 x l -> length of string
 */

const words = ["a", "b", "ba", "bca", "bda", "bdca"];

const n = words.length;

const checkPossible = (str1, str2) => {
  if (str1.length !== str2.length + 1) return false; //If we cannot make str1 by inserting 1 char to str2

  let first = 0;
  let second = 0;

  while (first < str1.length) {
    //Iterate till length of str1
    if (str1[first] === str2[second]) {
      //If chars match then move both pointers else only move 1st
      first++;
      second++;
    } else first++;
  }

  if (first === str1.length && second === str2.length) return true; //If both strings ended at same time

  return false;
};

const dp = new Array(n).fill(1);
const longestStringChain = () => {
  let maxi = 1;
  for (let i = 0; i < n; i++) {
    for (let prevIdx = 0; prevIdx < i; prevIdx++) {
      if (checkPossible(words[i], words[prevIdx]) && 1 + dp[prevIdx] > dp[i]) {
        dp[i] = 1 + dp[prevIdx];
      }
    }
    if (dp[i] > maxi) {
      maxi = dp[i];
    }
  }
  return maxi;
};

console.log(longestStringChain())