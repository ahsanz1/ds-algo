const str1 = "abcd".split("");
const str2 = "abzd".split("");

/**
 * For longest common substring, we just have to remove the condition where we keep one pointer still
 * & move the other & vice versa!
 */

const dpArr2 = new Array(str1.length + 1)
  .fill(0)
  .map(() => new Array(str2.length + 1).fill(0));

const longestCommonSubstringTabulation = () => {
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

  /**
   * NOTE: In order to find the length of LCS, we have to keep a variable
   * initialized to 0 & on each update to DP table we have to update that max (ans)
   * by comparing to see if the current value of LCS length that we have computed is
   * the max of all at the moment or not
   */

  let ans = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dpArr2[i][j] = 1 + dpArr2[i - 1][j - 1];
        ans = Math.max(ans, dpArr2[i][j]);
      } else dpArr2[i][j] = 0;
    }
  }

  return ans;
};

const dpArr3 = new Array(str1.length + 1)
  .fill("")
  .map(() => new Array(str2.length + 1).fill(""));

const getLongestCommonSubstring = () => {
  const n = str1.length;
  const m = str2.length;

  for (let j = 0; j <= m; j++) dpArr3[0][j] = "";
  for (let i = 0; i <= n; i++) dpArr3[i][0] = "";

  let maxLength = 0;
  let resultStr = "";

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dpArr3[i][j] = str1[i - 1] + dpArr3[i - 1][j - 1];
        if (dpArr3[i][j].length > maxLength) {
          maxLength = dpArr3[i][j].length;
          resultStr = dpArr3[i][j];
        }
      } else dpArr3[i][j] = "";
    }
  }

  return resultStr.split("").reverse().join("");
};

console.log(longestCommonSubstringTabulation());
console.log(getLongestCommonSubstring());
