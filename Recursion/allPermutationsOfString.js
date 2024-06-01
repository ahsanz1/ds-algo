const numStr = "819";
const numStrArr = numStr.split("");
const ds = [];
const permsArr = [];
const map = [];

const generatePermutations = (ds = [], permsArr = [], map = []) => {
  if (ds.length === numStrArr.length) {
    permsArr.push(Array.from(ds));
    return;
  }

  for (let i = 0; i < numStrArr.length; i++) {
    if (!map[i]) {
      map[i] = true;
      ds.push(numStrArr[i]);
      generatePermutations(ds, permsArr, map);
      ds.pop();
      map[i] = false;
    }
  }
};

generatePermutations(ds, permsArr, map);
for (let i = 0; i < permsArr.length; i++) console.log(permsArr[i].join(""));
