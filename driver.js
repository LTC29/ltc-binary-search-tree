// Helper function to generate an array of random numbers
function generateRandomNumbers(count, min, max) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomNumbers;
}

// Create a binary search tree from an array of random numbers
const numbers = generateRandomNumbers(10, 1, 100);
const tree = new BinarySearchTree(numbers);

// Confirm if the tree is balanced
console.log('Is Balanced:', tree.isBalanced());

// Perform traversals
const levelOrder = tree.levelOrderBFS();
const preOrder = tree.preOrderDFS();
const inOrder = tree.inOrderDFS();
const postOrder = tree.postOrderDFS();

// Print the traversed elements
console.log('Level Order:', levelOrder);
console.log('Pre-order:', preOrder);
console.log('In-order:', inOrder);
console.log('Post-order:', postOrder);

// Unbalance the tree by adding several numbers > 100
tree.insert(110);
tree.insert(120);
tree.insert(130);

// Confirm if the tree is unbalanced
console.log('Is Balanced:', tree.isBalanced());

// Balance the tree
tree.rebalance();

// Confirm if the tree is balanced after rebalancing
console.log('Is Balanced:', tree.isBalanced());

// Perform traversals again after rebalancing
const levelOrderAfterRebalance = tree.levelOrderBFS();
const preOrderAfterRebalance = tree.preOrderDFS();
const inOrderAfterRebalance = tree.inOrderDFS();
const postOrderAfterRebalance = tree.postOrderDFS();

// Print the traversed elements after rebalancing
console.log('Level Order (After Rebalance):', levelOrderAfterRebalance);
console.log('Pre-order (After Rebalance):', preOrderAfterRebalance);
console.log('In-order (After Rebalance):', inOrderAfterRebalance);
console.log('Post-order (After Rebalance):', postOrderAfterRebalance);
