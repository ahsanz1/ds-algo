const fibonacciIterative = (n) => {
  if (n === 0 || n === 1) return n;
  let num1 = 0;
  let num2 = 1;
  let index = 2;
  const fibonacci = [num1, num2];
  let sum = 0;

  while (index <= n) {
    sum = num1 + num2;
    fibonacci.push(sum);
    num1 = num2;
    num2 = sum;
    index++;
  }
  console.log(fibonacci);
  return fibonacci[index - 1];
};

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

const fibonacciRecursive = (n) => {
  if (n < 2) return n;

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
};

//2 +

// console.log(fibonacciIterative(43));
console.log(fibonacciRecursive(100));
