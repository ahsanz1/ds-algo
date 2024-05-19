/**
 * QUESTION: You have been given a number of stairs. Initially, you are at the Oth stair,
 *  and you need to reach the Nth stair. Each time you can either climb one step or two steps.
 *  You are supposed to return the number of distinct ways in which you can climb from the 0th
 *  step to Nth step.
 */

const climbingStairsRecursive = (i) => {
  if (i <= 1) return i;

  const oneStep = climbingStairsRecursive(i - 1);
  const twoSteps = climbingStairsRecursive(i - 2);

  return oneStep + twoSteps;
};

console.log(climbingStairsRecursive(3));
