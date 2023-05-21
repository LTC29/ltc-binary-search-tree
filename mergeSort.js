function mergeSort(n) {
  if (n.length < 2) {
    return n;
  } else {
    //cuts array in half and defines left and right side for merge
    let half = Math.floor(n.length / 2);
    let leftSide = n.slice(0, half);
    let rightSide = n.slice(half);
    //updates left and right side with new values
    leftSide = mergeSort(leftSide);
    rightSide = mergeSort(rightSide);
    return sortResults(leftSide, rightSide);
  }
}
function sortResults(rightSide, leftSide) {
  let fullArray = [];
  while (leftSide.length > 0 && rightSide.length > 0) {
    if (leftSide[0] < rightSide[0]) {
      //if left side value is smaller than right side, removes value from leftSide and pushes to fullArray and vice versa
      fullArray.push(leftSide.shift());
    } else {
      fullArray.push(rightSide.shift());
    }
  }
  //concatenates the remaining values
  return fullArray.concat(leftSide).concat(rightSide);
}
