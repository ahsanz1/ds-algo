/**
 * QUESTION: Min no. of operations to convert s1 to s2, you can insert any char in s1, remove any
 * char from s1 & replace any char in s1 with any char. This is different from previous one where
 * we had 2 ops options to perform to convert s1 to s2, now we have another option as well "replace"!
 *
 * NOTE: We can follow string matching path, if chars match thats fine if not then we have 3 options,
 *
 * 1- insert the same char
 * 2- delete & try finding somewhere else
 * 3- replace & match
 *
 * We have to try all possible ways! > Recursion > Of all possible stuffs, take the one that gives you
 * the minimum
 *
 * f(i,j) means minimum no. of operations to convert s1[0-i] to s2[0-j]
 * If s1[i] === s2[j], we'll just reduce the string & not do any operation
 * Else, we can try an insert, this will be a hypothetical insert in s1 of the same char (as s2).
 * After a hypothetical insert, i stays where it was & j gets reduced > 1 + f(i, j-1).
 * We can try a delete as well, we can delete s1[j] & look for s2[i] in 0-j-1 string. After deletion
 * of s1[j], j will reduce & i will stay the same because you're still looking for s2[i] > 1 + f(j-1, i).
 * We can try a replace as well, we replace (hypothetical) s[j] with s[i]. As a result s1[i] & s2[j]
 * will match & i & j both will be reduced > 1 + f(i-1, j-1)
 *
 * ^We then take the minumum of all these 3 ops.
 *
 * Base Case -> One of the strings gets exhausted! If i gets exhausted, it means we have an empty string.
 * To convert an empty string to s2[0-j], we need j + 1 steps (insertions)! So we return j + 1.
 * If j gets exhausted, it means we need to convert s1[0-i] to empty string! So we'll need i + 1
 * steps (deletions). So we return i + 1.
 *
 * TC -> 3^n * 3^m (because 3 states! 3 possibilities)
 * SC -> O (n + m) > ASS
 * 
 * TC DP -> O (n x m)
 * SC -> O(n x m) + O (n + m) (ASS)
 * 
 * Tabulation removes ASS
 */

const s1 = "horse";
const s2 = "ros";

const n = s1.length;
const m = s2.length;

const editDistanceS1toS2Recursive = (i, j) => {
  if (i < 0) return j + 1;
  if (j < 0) return i + 1;

  if (s1[i] === s2[j]) {
    return editDistanceS1toS2Recursive(i - 1, j - 1);
  } else {
    const insert = 1 + editDistanceS1toS2Recursive(i, j - 1);
    const _delete = 1 + editDistanceS1toS2Recursive(i - 1, j);
    const replace = 1 + editDistanceS1toS2Recursive(i - 1, j - 1);

    return Math.min(insert, _delete, replace);
  }
};

const dpArr = new Array(n).fill(-1).map(() => new Array(m).fill(-1));

const editDistanceS1toS2DP = (i, j) => {

/**
 * if (i === 0) return j;       for 1 based indexing j + 1 -> j, i === 3 means 2nd index!                  
  if (j === 0) return i;
 */

  if (i < 0) return j + 1;                   
  if (j < 0) return i + 1;

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  if (s1[i] === s2[j]) {
    dpArr[i][j] = editDistanceS1toS2Recursive(i - 1, j - 1);
    return dpArr[i][j];
  } else {
    const insert = 1 + editDistanceS1toS2Recursive(i, j - 1);
    const _delete = 1 + editDistanceS1toS2Recursive(i - 1, j);
    const replace = 1 + editDistanceS1toS2Recursive(i - 1, j - 1);

    dpArr[i][j] = Math.min(insert, _delete, replace);
    return dpArr[i][j];
  }
};

const dpTabulation = new Array(n + 1)
  .fill(0)
  .map(() => new Array(m + 1).fill(0));

const editDistanceS1toS2Tabulation = () => {
  for (let i = 0; i <= n; i++) dpTabulation[i][0] = i; //because in based indexing i + 1 -> i
  for (let j = 0; j <= m; j++) dpTabulation[0][j] = j;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dpTabulation[i][j] = dpTabulation[i - 1][j - 1];
      } else {
        const insert = 1 + dpTabulation[i][j - 1];
        const _delete = 1 + dpTabulation[i - 1][j];
        const replace = 1 + dpTabulation[i - 1][j - 1];

        dpTabulation[i][j] = Math.min(insert, _delete, replace);
      }
    }
  }
  return dpTabulation[n][m];
};

console.log(editDistanceS1toS2Recursive(n - 1, m - 1));
console.log(editDistanceS1toS2DP(n - 1, m - 1));
console.log(editDistanceS1toS2Tabulation());
console.log(dpTabulation);
