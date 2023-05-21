import mergeSort from './mergeSort.js'; //my own mergeSort algorithm

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(array) {
    this.root = null;
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
      this.root = null;
      return this;
    } else if (!node.left && !node.right) {
      return null;
    } else if (!node.left) {
      parentNode.right = node.right;
      return this;
    } else if (!node.right) {
      parentNode.left = node.left;
      return this;
    } else {
      let tempNode = node.right;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }
      this.delete(tempNode.value);
      node.value = tempNode.value;
      return this;
    }
  }
}
