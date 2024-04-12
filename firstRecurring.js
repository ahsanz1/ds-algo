const arr = [2, 5, 1, 2, 3, 5, 1, 2, 4];
const arr2 = [2, 3, 4, 5];

const firstRecurring = (arr) => {
  const hashMap = {};

  for (let i = 0; i < arr.length; i++) {
    if (hashMap[arr[i]]) return arr[i];

    hashMap[arr[i]] = true;
  }
  return undefined;
};

console.log(firstRecurring(arr2));
