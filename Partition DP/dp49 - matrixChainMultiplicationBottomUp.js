
const arr = [10, 20, 30, 40, 50];
const n = arr.length;

const dpTabulation = new Array(n).fill(-1).map(() => new Array(n).fill(-1));

const mcmTabulation = () => {
  for (let i = 1; i < n; i++) dpTabulation[i][i] = 0;

  for (let i = n - 1; i >= 1; i--) {
    /**
     * Cant start j from 0 because i is always on left of j, so j= 0 means j is left of i!
     * So that's why we start at i + 1
     */
    for (let j = i + 1; j < n; j++) {
      let min = Infinity;
      for (let k = i; k < j; k++) {
        const steps =
          arr[i - 1] * arr[k] * arr[j] +
          dpTabulation[i][k] +
          dpTabulation[k + 1][j];
        min = Math.min(min, steps);
      }
      dpTabulation[i][j] = min;
    }
  }
  return dpTabulation[1][n - 1];
};