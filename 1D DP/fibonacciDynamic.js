const fibonacciMaster = (n) => {
  const cache = {};

  return function fib(n) {
    if (cache[n]) return cache[n];
    else {
      if (n < 2) {
        return n;
      } else {
        const sum = fib(n - 1) + fib(n - 2);
        cache[n] = sum;
        return sum;
      }
    }
  };
};

const memoizedFib = fibonacciMaster(10);
console.log(memoizedFib(100));
