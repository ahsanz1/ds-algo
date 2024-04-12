const str1 = "brute";
const str2 = "groot";

const dpArr2 = new Array(str1.length + 1)
  .fill(0)
  .map(() => new Array(str2.length + 1).fill(0));

const longestCommonSubsequenceTabulation = () => {
  /**
   * For tabulation, we'll do shifting of indexes because in this case our base case is for values < 0
   * & we cannot write dp[-1][-1]. So we'll shift the indexes right by 1. This will mean that f(i,j)
   * will map to f(i-1, j-1), f(0) -> f(-1) etc
   */

  //if (ind1 < 0 || ind2 < 0) return 0; will become ind1 === 0 || ind2 === 0

  const n = str1.length;
  const m = str2.length;

  for (let j = 0; j <= m; j++) dpArr2[0][j] = 0;
  for (let i = 0; i <= n; i++) dpArr2[i][0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) dpArr2[i][j] = 1 + dpArr2[i - 1][j - 1];
      else dpArr2[i][j] = Math.max(dpArr2[i][j - 1], dpArr2[i - 1][j]);
    }
  }

  return dpArr2[n][m];
};

const shortestCommonSupersequence = () => {
  /**
   * Length of SCS = n + m - len(LCS)
   * In order to form a SCS we'll take the common chars only once! We'd want to take a longer patch of common chars
   * so that they're used once!
   */

  console.log(longestCommonSubsequenceTabulation());
  for (let x = 0; x < dpArr2.length; x++) console.log(dpArr2[x]);
  let i = str1.length;
  let j = str2.length;
  let scs = "";

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      scs = scs + str1[i - 1];
      i--, j--;
    } else if (dpArr2[i - 1][j] > dpArr2[i][j - 1]) {
      scs = scs + str1[i - 1];
      i--;
    } else {
      scs = scs + str2[j - 1];
      j--;
    }
  }

  while (i > 0) {
    scs = scs + str1[i - 1];
    i--;
  }

  while (j > 0) {
    scs = scs + str2[j - 1];
    j--;
  }

  return scs.split("").reverse().join("");
};

console.log(shortestCommonSupersequence());
