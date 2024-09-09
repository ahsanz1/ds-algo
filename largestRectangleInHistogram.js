/**
 *
 *
 * Brute Force -> For every a[i] (every height), you have to figure out the left smaller element & the right smaller element
 * & then right - left will be the width of the rectangle. On every index, run a loop to find left smaller & another loop to
 * find the right smaller. -> N^2 solution
 */

const heights = [2, 1, 5, 6, 2, 3, 1];
const n = heights.length;
let leftSmall = new Array(n).fill(-1);
let rightSmall = new Array(n).fill(-1);
const stack = [];
let top = stack.length - 1;

const isEmpty = (stack = []) => {
  return stack.length === 0;
};

const largestRectHist = () => {
  for (let i = 0; i < n; i++) {
    while (!isEmpty(stack) && heights[stack[top]] >= heights[i]) {
      stack.pop();
      top--;
    }

    if (isEmpty(stack)) leftSmall[i] = 0;
    else leftSmall[i] = stack[top] + 1;

    stack.push(i);
    top++
  }

  while (!isEmpty(stack)) {
    stack.pop();
    top--;
  }

  for (let j = n - 1; j >= 0; j--) {
    while (!isEmpty(stack) && heights[stack[top]] >= heights[j]) {
      stack.pop();
      top--;
    }

    if (isEmpty(stack)) rightSmall[j] = n - 1;
    else rightSmall[j] = stack[top] - 1;

    stack.push(j);
    top++
  }

  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    const area = (rightSmall[i] - leftSmall[i] + 1) * heights[i];
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
};

console.log(largestRectHist());