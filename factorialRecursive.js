const iterativeFactorial = (n) => {
  let num = n;
  let factorial = 1;

  while (num >= 1) {
    factorial = factorial * num;
    num--;
  }
  return factorial;
};

const recursiveFactorial = (n) => {
  if (n === 1 || n === 0) return 1;

  return n * recursiveFactorial(n - 1);
};

//1
//2 * 1!
//3 * 2!
//4 * 3!
//5 * 4!

console.log(iterativeFactorial(0));
console.log(recursiveFactorial(0));
