function generateRandomNumbers(count, min, max) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomNumbers;
}

const numbers = generateRandomNumbers(10, 1, 100);
const tree = new BinarySearchTree(numbers);

console.log('Is Balanced:', tree.isBalanced());

const levelOrder = tree.levelOrderBFS();
const preOrder = tree.preOrderDFS();
const inOrder = tree.inOrderDFS();
const postOrder = tree.postOrderDFS();

console.log('Level Order:', levelOrder);
console.log('Pre-order:', preOrder);
console.log('In-order:', inOrder);
console.log('Post-order:', postOrder);

tree.insert(110);
tree.insert(120);
tree.insert(130);

console.log('Is Balanced:', tree.isBalanced());

tree.rebalance();

console.log('Is Balanced:', tree.isBalanced());

const levelOrderAfterRebalance = tree.levelOrderBFS();
const preOrderAfterRebalance = tree.preOrderDFS();
const inOrderAfterRebalance = tree.inOrderDFS();
const postOrderAfterRebalance = tree.postOrderDFS();

console.log('Level Order (After Rebalance):', levelOrderAfterRebalance);
console.log('Pre-order (After Rebalance):', preOrderAfterRebalance);
console.log('In-order (After Rebalance):', inOrderAfterRebalance);
console.log('Post-order (After Rebalance):', postOrderAfterRebalance);

console.log('Checking if it is balanced one last time:', tree.isBalanced());
