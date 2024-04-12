const reverseStringRecursive = (s, index) => {
  if (s.length === index) return;
  reverseStringRecursive(s, index + 1);
  console.log(s.charAt(index));
};

reverseStringRecursive("ahsan", 0);
