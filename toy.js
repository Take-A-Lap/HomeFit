var printColumn = function(matrix, rowNum, direction){
  if(direction === "up"){
    matrix.reverse();
  }
  return matrix.reduce((acc, curr, i)=>{
    return acc.concat(matrix[i][rowNum]);
  }, []);
};

var removeBack = function(matrix){
  matrix.forEach(array=>{
    array.pop();
  });
  return matrix;
};

var removeFront = function(matrix){
  matrix.forEach(array=>{
    array.shift();
  });
  return matrix;
};

var spiralTraversal = function(matrix){
  // TODO: Implement me!
  if(matrix.length === 1){
    return matrix[0];
  }
  //print the first el
  let solution = matrix[0];
  //pop off the first el
  matrix.shift();
  //print the last column
  
  solution = solution.concat(printColumn(matrix, matrix[0].length - 1, "down"));
  //pop off the last column
  removeBack(matrix);
  //print the last el in reverse
  matrix[matrix.length - 1].reverse();
  solution = solution.concat(matrix[matrix.length - 1]);
  // console.log(solution);
  //pop off the last el
  matrix.pop();
  //print the first column in reverse
  solution = solution.concat(printColumn(matrix, 0, "up"));
  // console.log(solution);
  //pop off the first column
  removeFront(matrix);
  //recurse
  matrix.reverse();
  console.log(matrix);
  solution = solution.concat(spiralTraversal(matrix));
  return solution;
  
};
