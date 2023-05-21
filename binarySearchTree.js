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
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (currentNode.value !== value) {
        //if value is equal to current we don't want to insert
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
}

//  Traversing left and right
//
//            if(value < currentNode.value){ //traverse left
//                 if(!currentNode.left){
//                     currentNode.left = newNode;
//                 }else{
//                     currentNode = currentNode.left;
//                 }
//             }else if(value > currentNode.value){ //traverse right
//                 if(!currentNode.right){
//                     currentNode.right = newNode;
//                 }else{
//                     currentNode = currentNode.right;
//                 }
