/**
 * There is a frog on the 1st step of an N stairs long staircase. The frog wants to reach the Nth stair.
HEIGHT[i] is the height of the (i+1)th stair.If Frog jumps from ith to jth stair, the energy lost in the jump
is given by HEIGHT[i-1] - HEIGHT[j-1] |.In the Frog is on ith staircase, he can jump either to (i+1)th
stair or to (i+2)th stair. Your task is to find the minimum total energy used by the frog to reach from 1st
stair to Nth stair.
 */

const arr = [30, 10, 60, 10, 60, 50];
const hashMap = {};

/**
 * Recursive solution TC -> O(2^n), SC -> Max depth of recursion tree -> O(n)
 * With DP TC -> O(n), SC -> O(n) (array) + O(n) stack space for depth of recursion tree
 * With Bottom Up TC -> O(n), SC -> O(1) as no stack or array is required
 */

const frogJump = (index) => {
  if (index === 0) return 0;

  if (hashMap[index]) return hashMap[index];

  let left = frogJump(index - 1) + Math.abs(arr[index] - arr[index - 1]);
  let right = Infinity;

  if (index > 1)
    right = frogJump(index - 2) + Math.abs(arr[index] - arr[index - 2]);

  hashMap[index] = Math.min(left, right);
  return hashMap[index];
};

const frogJumpBottomUp = (n) => {
  let prev = 0;
  let prev2 = 0;
  let curi = 0;

  for (let i = 1; i <= n; i++) {
    let fs = prev + Math.abs(arr[i] - arr[i - 1]);
    let ss = Infinity;
    if (i > 1) ss = prev2 + Math.abs(arr[i] - arr[i - 2]);
    curi = Math.min(fs, ss);
    prev2 = prev;
    prev = curi;
  }
  return prev;
};

const k = 4;

/**
 * TC -> O(n x k) because there are n states (indexes) & from each index you can take k type of jumps
 * SC -> O(n) for stack space & O(n) for DP DS
 */

const frogJumpWithKJumps = (index) => {
  if (index === 0) return 0;

  if (hashMap[index]) return hashMap[index];

  let minEnergy = Infinity;
  let jumpEnergy = 0;

  for (let j = 1; j <= k; j++) {
    if (index - j >= 0) {
      jumpEnergy =
        frogJumpWithKJumps(index - j) + Math.abs(arr[index] - arr[j]);
      minEnergy = Math.min(minEnergy, jumpEnergy);
    } else break;
  }

  hashMap[index] = minEnergy;
  return hashMap[index];
};

console.log(frogJumpWithKJumps(5));
