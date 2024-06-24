/**
 * QUESTION: You will be given a string that contains a boolean expression. Expression can have operands |, ^(XOR) and &.
 * You have to find the number of ways in which this expression can evaluate to true.
 * Exp = "T|T&F" -> There's one way this can evaluate to true.
 *
 * On every operand, you're breaking the problem to 2 subproblems.
 * Exp = T ^ F | T & F ^ T | F
 *       i        ind        j
 *       (left)        (right)
 * Operands start at i+1 & end at j-1 & are always at a distance of i+2. If we do partition at ind then left subproblem will
 * be f(i, ind-1) & right will be f(ind+1, js).
 *
 * If we're doing partition on an & operator, both left & right have to yield true. So total ways in which (left) & (right)
 * can yield true is Total Ways = X x Y where X is the number of ways in which (left) can yield true & Y is the number of ways
 * in which (right) can yield true.
 *
 * If we're doing partition on an | operator, Total ways in which (left) | (right)
 * can yield true is Total Ways = (X1 x X2) + (X1 x X3) + (X2 x X4) where,
 * X1 is the number of ways in which (left) can yield true & X2 is the number of ways in which (right) can yield true.
 * X3 is the number of ways in which (right) can yield false & X4 is the number of ways in which (left) can yield false.
 *
 * If we're doing partition on a ^ operator, Total ways in which (left) ^ (right)
 * can yield true is Total Ways = (X1 x X4) + (X3 x X2) where,
 * X1 is the number of ways in which (left) can yield true & X4 is the number of ways in which (right) can yield false.
 * X3 is the number of ways in which (left) can yield false & X2 is the number of ways in which (right) can yield true.
 *
 * In essence, what ever range i,j you're solving you have to figure out in how many ways it can be made true & in how many
 * ways it can be made false. You have to carry a variable lookingForTrue which tells whether we're looking for the number of ways
 * in which we can make the range evaluate to true or vice versa.
 * f(0,10,1) -> Initial expression, in how many ways can we make the initial expression evaluate to true.
 *
 * Base Case
 * If the partition is over, i > j, there are 0 ways you can make the result true so return 0.
 * Single partition will either be true or false. If there's a single element in the partition i === j then it will
 * either be true or false. If you're looking for true (lookingForTrue === true) then there's only 1 way you can make the partition
 * evaluate to true & that is if a[i] === 'T'. If you're looking for false (lookingForTrue === false) then there's only 1 way you can
 * make the partition evaluate to false & that is if a[i] === 'F'.
 *
 * Recursive Case
 * For each partition, calculate in how many ways each subproblem can evaluate to true or false. Then for each operator,
 * if you're looking for true then calculate the ways in which operands of that operator can evaluate to true, add to total ways.
 * Do the same if you're looking for false.
 *
 * TC -> Exponential
 *
 * TC DP -> (N x N x 2)(no. of states) x N(loop for calculating each state)
 * SC DP -> (N x N x 2) + ASS
 *
 */

const expStr = "T^F|T&F^T|F";
const n = expStr.length;

const evalBoolExpTrue = (i, j, lookingForTrue) => {
  if (i > j) return 0;
  if (i === j) {
    if (lookingForTrue) return expStr[i] === "T";
    else return expStr[i] === "F";
  }

  let ways = 0;

  for (let ind = i + 1; ind <= j - 1; ind += 2) {
    //Count all the ways in which left partition can evaluate to true
    const leftTrue = evalBoolExpTrue(i, ind - 1, 1);
    //Count all the ways in which left partition can evaluate to false
    const leftFalse = evalBoolExpTrue(i, ind - 1, 0);
    //Count all the ways in which right partition can evaluate to true
    const rightTrue = evalBoolExpTrue(ind + 1, j, 1);
    //Count all the ways in which right partition can evaluate to false
    const rightFalse = evalBoolExpTrue(ind + 1, j, 0);

    if (expStr[ind] === "&") {
      if (lookingForTrue) {
        ways = ways + leftTrue * rightTrue;
      } else {
        ways =
          ways +
          leftTrue * rightFalse +
          leftFalse * rightTrue +
          leftFalse * rightFalse;
      }
    } else if (expStr[ind] === "|") {
      if (lookingForTrue) {
        ways =
          ways +
          leftTrue * rightFalse +
          leftFalse * rightTrue +
          leftTrue * rightTrue;
      } else {
        ways = ways + leftFalse * rightFalse;
      }
    } else if (expStr[ind] === "^") {
      if (lookingForTrue) {
        ways = ways + leftTrue * rightFalse + leftFalse * rightTrue;
      } else {
        ways = ways + leftTrue * rightTrue + leftFalse * rightFalse;
      }
    }
  }

  return ways;
};

const dp = new Array(n)
  .fill(-1)
  .map(() => new Array(n).fill(-1).map(() => new Array(2).fill(-1)));

const evalBoolExpTrueDP = (i, j, lookingForTrue) => {
  if (i > j) return 0;
  if (i === j) {
    if (lookingForTrue) return expStr[i] === "T";
    else return expStr[i] === "F";
  }

  if (dp[i][j][lookingForTrue] !== -1) return dp[i][j][lookingForTrue];

  let ways = 0;

  for (let ind = i + 1; ind <= j - 1; ind += 2) {
    //Count all the ways in which left partition can evaluate to true
    const leftTrue = evalBoolExpTrue(i, ind - 1, 1);
    //Count all the ways in which left partition can evaluate to false
    const leftFalse = evalBoolExpTrue(i, ind - 1, 0);
    //Count all the ways in which right partition can evaluate to true
    const rightTrue = evalBoolExpTrue(ind + 1, j, 1);
    //Count all the ways in which right partition can evaluate to false
    const rightFalse = evalBoolExpTrue(ind + 1, j, 0);

    if (expStr[ind] === "&") {
      if (lookingForTrue) {
        ways = ways + leftTrue * rightTrue;
      } else {
        ways =
          ways +
          leftTrue * rightFalse +
          leftFalse * rightTrue +
          leftFalse * rightFalse;
      }
    } else if (expStr[ind] === "|") {
      if (lookingForTrue) {
        ways =
          ways +
          leftTrue * rightFalse +
          leftFalse * rightTrue +
          leftTrue * rightTrue;
      } else {
        ways = ways + leftFalse * rightFalse;
      }
    } else if (expStr[ind] === "^") {
      if (lookingForTrue) {
        ways = ways + leftTrue * rightFalse + leftFalse * rightTrue;
      } else {
        ways = ways + leftTrue * rightTrue + leftFalse * rightFalse;
      }
    }
  }

  dp[i][j][lookingForTrue] = ways;
  return dp[i][j][lookingForTrue];
};

console.log(evalBoolExpTrue(0, n - 1, 1));
console.log(evalBoolExpTrueDP(0, n - 1, 1));
