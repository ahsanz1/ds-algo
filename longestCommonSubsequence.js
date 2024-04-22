const str1 = "abc".split("");
const str2 = "ace".split("");

const dpArr = new Array(str1.length)
  .fill(-1)
  .map(() => new Array(str2.length).fill(-1));

/**
 * f(ind1, ind2) -> tell me the LCS of s1 & s2 till ind1 & ind2
 *
 * If chars are equal, this means that we have found a common subsequence of length 1, so we add 1, move both indexes &
 * we ask recursion to go & check if this subsequence has more to it (length can increase or not)
 *
 * If chars do not match, then we try both possibilities. Move 1 index & keep the other as same to check if moving 1
 * index can find a matching char & contribute to LCS
 *
 * If any of the indexes goes below 0, this means that subsequence cannot be found any further so the length is 0!
 *
 * TC -> 2^n x 2^m
 * Tabulation TC -> N x M
 * Tabulation SC -> N x M
 */

const longestCommonSubsequence = (ind1, ind2) => {
  if (ind1 < 0 || ind2 < 0) return 0;

  if (dpArr[ind1][ind2] !== -1) return dpArr[ind1][ind2];

  if (str1[ind1] === str2[ind2]) {
    dpArr[ind1][ind2] = 1 + longestCommonSubsequence(ind1 - 1, ind2 - 1);
    return dpArr[ind1][ind2];
  }

  /**
   * NOTE: Either solve this guy or solve this guy, take whatever gives you the max answer
   */

  dpArr[ind1][ind2] = Math.max(
    longestCommonSubsequence(ind1, ind2 - 1),
    longestCommonSubsequence(ind1 - 1, ind2)
  );

  return dpArr[ind1][ind2];
};

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

  /**
   * NOTE: For all values of j, as long as i === 0, contribution to our LCS will be 0
   */

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

const dpArr3 = new Array(str1.length)
  .fill("")
  .map(() => new Array(str2.length).fill(""));

const getLongestCommonSubsequence = (ind1, ind2) => {
  if (ind1 < 0 || ind2 < 0) return "";

  if (dpArr3[ind1][ind2] !== "") return dpArr3[ind1][ind2];

  if (str1[ind1] === str2[ind2]) {
    dpArr3[ind1][ind2] =
      str1[ind1] + getLongestCommonSubsequence(ind1 - 1, ind2 - 1);
    return dpArr3[ind1][ind2];
  }

  const mov1st = getLongestCommonSubsequence(ind1 - 1, ind2);
  const move2nd = getLongestCommonSubsequence(ind1, ind2 - 1);

  dpArr3[ind1][ind2] = mov1st.length > move2nd.length ? mov1st : move2nd;
  return dpArr3[ind1][ind2];
};


console.log(longestCommonSubsequence(2, 2));
console.log(longestCommonSubsequenceTabulation());
console.log(getLongestCommonSubsequence(2, 2).split("").reverse().join(""));
