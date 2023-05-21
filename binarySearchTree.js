class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(array = []) {
    if (array.length === 0) {
      this.root = null;
    } else {
      this.root = this.buildTree(this.sortAndRemoveDuplicates(array));
    }
  }

  sortAndRemoveDuplicates(array) {
    let sortedArray = mergeSort(array);
    let noDuplicates = [];
    for (let i = 0; i < sortedArray.length; i++) {
      //if index = 1 then sortedArray.length would need +1
      //if the current value is not equal to the next value, push to noDuplicates
      if (sortedArray[i] !== sortedArray[i + 1]) {
        noDuplicates.push(sortedArray[i]);
      }
    }
    return noDuplicates;
  }

  buildTree(noDuplicates) {
    if (noDuplicates.length === 0) {
      return null;
    }
    let half = Math.floor(noDuplicates.length / 2);
    let root = new Node(noDuplicates[half]);
    root.left = this.buildTree(noDuplicates.slice(0, half));
    root.right = this.buildTree(noDuplicates.slice(half + 1));
    return root;
  }

  find(value) {
    //useful to traverse left and right and finds parent node
    if (!this.root) {
      return false;
    } else if (this.root.value === value) {
      return [this.root, null];
    }
    let currentNode = this.root;
    let parentNode;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        return [currentNode, parentNode];
      }
    }
    return false;
  }

  insert(value) {
    //since it adds a new value, that value isn't checked by the mergeSort algorithm that deals with the original array, therefore we need to make sure there are no duplicates by not inserting the value if it already exists
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (currentNode.value !== value) {
        //if value is equal to current we don't want to insert and the while loop will break
        if (value < currentNode.value) {
          //traverse left
          if (!currentNode.left) {
            currentNode.left = newNode;
          } else {
            currentNode = currentNode.left;
          }
        } else if (value > currentNode.value) {
          //traverse right
          if (!currentNode.right) {
            currentNode.right = newNode;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }
  delete(value) {
    let nodeAndParent = this.find(value);
    let node = nodeAndParent[0];
    let parentNode = nodeAndParent[1];
    if (!node) {
      return false;
    } else if (!node.left && !node.right && node.value === this.root.value) {
      //deletes root node
      return null;
    } else if (!node.left && !node.right) {
      //deletes leaf node
      return null;
    } else if (!node.left) {
      //deletes node with one right child
      parentNode.right = node.right;
      return this;
    } else if (!node.right) {
      //delete node with one left child
      parentNode.left = node.left;
      return this;
    } else {
      //deletes node with two children
      let temp = node.right;
      while (temp.left) {
        temp = temp.left;
      }
      this.delete(temp.value);
      node.value = temp.value;
      return this;
    }
  }
  levelOrderBFS() {
    //breadth-first level order traversal and logs the correct order to console

    let queue = [];
    let visitedValues = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      visitedValues.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return visitedValues;
  }

  //Pre-order = root, left, right
  //In-order = left, root, right
  //Post-order = left, right, root

  //Note that the root is moving on the above formulas, so in my code, what is changing is the array.push

  preOrderDFS(currentNode = this.root, visitedValues = []) {
    //depth-first pre-order traversal and logs array
    if (currentNode) {
      visitedValues.push(currentNode.value);
      visitedValues = this.preOrderDFS(currentNode.left, visitedValues);
      visitedValues = this.preOrderDFS(currentNode.right, visitedValues);
    }
    return visitedValues;
  }

  inOrderDFS(currentNode = this.root, visitedValues = []) {
    //depth-first in-order traversal and logs array
    if (currentNode) {
      visitedValues = this.inOrderDFS(currentNode.left, visitedValues);
      visitedValues.push(currentNode.value);
      visitedValues = this.inOrderDFS(currentNode.right, visitedValues);
    }
    return visitedValues;
  }

  postOrderDFS(currentNode = this.root, visitedValues = []) {
    //depth-first post-order traversal and logs array
    if (currentNode) {
      visitedValues = this.postOrderDFS(currentNode.left, visitedValues);
      visitedValues = this.postOrderDFS(currentNode.right, visitedValues);
      visitedValues.push(currentNode.value);
    }
    return visitedValues;
  }

  nodeHeight(value) {
    let targetNode = this.find(value)[0];
    if (!targetNode) {
      return -1; //node doesn't exist
    }
    let leftHeight = 0;
    let rightHeight = 0;
    let currentNode = targetNode;
    while (currentNode.left) {
      leftHeight++;
      currentNode = currentNode.left; //keeps going left and calculates height
    }
    currentNode = targetNode;
    while (currentNode.right) {
      rightHeight++;
      currentNode = currentNode.right; //keeps going right and calculates height
    }
    if (leftHeight > rightHeight) {
      //returns the greater height
      return leftHeight;
    }
    return rightHeight;
  }

  nodeDepth(value) {
    let targetNode = this.find(value)[0];
    if (!targetNode) {
      return -1; //node doesn't exist
    }
    let depth = 0;
    let currentNode = targetNode;
    while (currentNode !== this.root) {
      depth++;
      currentNode = this.find(currentNode.value)[1];
    }
    return depth;
  }

  isBalanced() {
    let leftHeight = this.nodeHeight(this.root.left.value);
    let rightHeight = this.nodeHeight(this.root.right.value);
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    }
    return false;
  }

  rebalance() {
    let sortedArray = this.sortAndRemoveDuplicates(this.levelOrderBFS());
    this.root = this.buildTree(sortedArray);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
