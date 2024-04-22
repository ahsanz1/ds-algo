/**
 * QUESTION: 2 strings, s1 & s2. We have to match s1 with s2. s1 can have ? & *. ? can match with
 * 1 char & * can match with a sequene of length 0 to any no. of chars.
 * s1=ab*cd, s2=abdefcd, * can either match with def, or f, or ef, etc or cannot match with any char
 * (become ""). So, we have to try all possible combinations from within s2 to match with * > Recursion.
 *
 * f(n-1, m-1) > f(i,j) represents whether s1[0-4] matches with s2[0-6]
 *
 * We have 3 cases in case of matching
 *
 * If s1[i] === s2[j] or s1[i] === '?'
 * both chars are matching & we can reduce both strings f(i-1, j-1)
 * If s1[i] === '*'
 * we can recursively match * with 0 or more chars > this comparison will eventually end when we find a
 * matching char via earlier if condition
 * f(i-1, j) -> consider * as "", dont match with any char
 * f(i-1, j-1) -> match with one char from s2 & reduce both strings
 * Else does not match
 *
 * Base Case -> If s1 is exhausted & s2 is exhausted, comparisons are complete & we can return true
 * If s1 is exhausted & s2 has some chars return false as there are comparisons left to be made
 * If s2 is exhausted & s1 has some length, then in order for returning true, all chars in s1 have to be *'s
 * 
 * TC -> Exponential -> 2^n, SC -> O (n + m)
 * TC DP -> O (n x m), SC DP -> O (n x m) + O (n + m)
 * TC Tabulation -> O(n x m), SC -> O(n x m)
 */

const s1 = "ab*cd";
const s2 = "abdefcd";

const n = s1.length;
const m = s2.length;

const wildCardMatchingRecursive = (i, j) => {
  if (i < 0 && j < 0) return true;
  if (i < 0 && j >= 0) return false;
  if (i >= 0 && j < 0) {
    for (let x = 0; x <= i; x++) {
      if (s1[x] !== "*") return false;
    }
    return true;
  }

  if (s1[i] === s2[j] || s1[i] === "?")
    return wildCardMatchingRecursive(i - 1, j - 1);
  if (s1[i] === "*")
    return (
      wildCardMatchingRecursive(i - 1, j) || wildCardMatchingRecursive(i, j - 1)
    );

  return false;
};

const dpArr = new Array(n).fill(-1).map(() => new Array(m).fill(-1));

const wildCardMatchingDP = (i, j) => {
  if (i < 0 && j < 0) return true; // i === 0 && j === 0 -> 1 based indexing
  if (i < 0 && j >= 0) return false; // i === 0 && j > 0 -> 1 based indexing
  if (i >= 0 && j < 0) {
    // i > 0 && j === 0 -> 1 based indexing
    for (let x = 0; x <= i; x++) {
      //x = 1 -> 1 based indexing
      if (s1[x] !== "*") return false; //s[x-1]
    }
    return true;
  }

  if (dpArr[i][j] !== -1) return dpArr[i][j];

  if (s1[i] === s2[j] || s1[i] === "?") {
    //s1[i-1] === s2[j-1] || s1[i-1] -> 1 based indexing
    dpArr[i][j] = wildCardMatchingRecursive(i - 1, j - 1);
    return dpArr[i][j];
  }
  if (s1[i] === "*") {
    //s1[i-1]
    dpArr[i][j] =
      wildCardMatchingRecursive(i - 1, j) ||
      wildCardMatchingRecursive(i, j - 1);
    return dpArr[i][j];
  }

  return false;
};

const dpTabulation = new Array(n + 1)
  .fill(false)
  .map(() => new Array(m + 1).fill(false));

const wildCardMatchingTabulation = () => {
  dpTabulation[0][0] = true;

  for (let j = 1; j <= m; j++) dpTabulation[0][j] = false;
  for (let i = 1; i <= n; i++) {
    let flag = true;
    for (let k = 1; k <= i; k++) {
      if (s1[k] !== "*") {
        flag = false;
        break;
      }
    }
    dpTabulation[i][0] = flag;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1] || s1[i - 1] === "?")
        dpTabulation[i][j] = dpTabulation[i - 1][j - 1];
      else if (s1[i - 1] === "*") {
        dpTabulation[i][j] = dpTabulation[i - 1][j] || dpTabulation[i][j - 1];
      } else dpTabulation[i][j] = false;
    }
  }
  return dpTabulation[n][m]
};

console.log(wildCardMatchingRecursive(n - 1, m - 1));
console.log(wildCardMatchingDP(n - 1, m - 1));
console.log(wildCardMatchingTabulation())
