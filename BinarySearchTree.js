class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (newNode.value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (newNode.value > current.value) {
        if (current.right == null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  lookup(value) {
    if (this.root?.value === value) return true;

    let current = this.root;

    while (current !== null) {
      if (current.value === value) return true;
      else if (value < current.value) current = current.left;
      else if (value > current.value) current = current.right;
    }

    return false;
  }

  bfsIterative() {
    let current = this.root;
    const queue = [];
    const list = [];
    queue.push(current);

    while (queue.length > 0) {
      current = queue.shift();
      list.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return list;
  }

  bfsRecursive(queue, list) {
    if (queue.length === 0) return list;

    let current = queue.shift();
    list.push(current.value);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);

    return this.bfsRecursive(queue, list);
  }

  DFSInOrder() {
    return traverseInOrder(this.root, []);
  }

  DFSPreOrder() {
    return traversePreOrder(this.root, []);
  }
  DFSPostOrder() {
    return traversePostOrder(this.root, []);
  }
}

function traverseInOrder(node, list) {
  if (node.left) traverseInOrder(node.left, list);
  list.push(node.value);
  if (node.right) traverseInOrder(node.right, list);
  return list;
}

function traversePreOrder(node, list) {
  list.push(node.value);
  if (node.left) traverseInOrder(node.left, list);
  if (node.right) traverseInOrder(node.right, list);
  return list;
}

function traversePostOrder(node, list) {
  if (node.left) traverseInOrder(node.left, list);
  if (node.right) traverseInOrder(node.right, list);
  list.push(node.value);
  return list;
}

const bst = new BinarySearchTree();
bst.insert(9);
bst.insert(4);
bst.insert(6);
bst.insert(20);
bst.insert(170);
bst.insert(15);
bst.insert(1);

console.log(bst.bfsIterative());
console.log(bst.bfsRecursive([bst.root], []));
console.log(bst.DFSInOrder());
console.log(bst.DFSPreOrder());
console.log(bst.DFSPostOrder());
