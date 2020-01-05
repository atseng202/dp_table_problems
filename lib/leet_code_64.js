// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

// Given a mxn grid (2D) of non-neg #s, find a path from top left to bottom right which minimizes the sum of all
// numbers in its path
// can only move +1 to the right (same array) or +1 to the bottom (next corresponding array)
function minPath1D(grid) {
  let table = new Array(grid.length * grid[0].length).fill(0);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const currTableIndex = (y * (grid[0].length)) + x;
      // console.log(`y: ${y}, x: ${x}, currentIndex: ${currTableIndex}`);
      const currVal = grid[y][x];
      // number of indices passed + current x index
      let aboveSum;
      let leftSum;
      if (y - 1 >= 0) aboveSum = table[currTableIndex - grid[0].length];
      if (x - 1 >= 0) leftSum = table[currTableIndex - 1];
     
      if (aboveSum === undefined && leftSum !== undefined ) {
        table[currTableIndex] = currVal + leftSum;
      } else if (leftSum === undefined && aboveSum !== undefined ) {
        table[currTableIndex]  = currVal + aboveSum;
      } else if (leftSum === undefined && aboveSum === undefined) {
        table[currTableIndex] = currVal;
      } else {
        // either reached the end or we still thru the middle of the array's path
        const prevMinSum = Math.min(aboveSum, leftSum);
        table[currTableIndex] = prevMinSum + currVal;
      }
    }
  }
  // console.log(table);
  return table[table.length - 1];
}
function minPathSum(grid) {
  // smallest problem is the sum of 1 x 1 array
  // m by n array table
  // let table = new Array(grid.length).fill(new Array(grid[0].length).fill(0));
  let table = new Array(grid.length);
  for (i = 0; i < grid.length; i++) {
    let xTable = new Array(grid[0].length).fill(0);
    table[i] = xTable;
  }
   
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[0].length; x++) {
      // console.log(`y: ${y}, x: ${x}`);
      // at this current coord
      // if there is a value above and to the left of it (this is a smaller sum and we will compare to two)
      // to calculate our current sum
      const currVal = grid[y][x];
      let aboveSum;
      let leftSum;
      if (y - 1 >= 0) { aboveSum = table[y - 1][x]; }
      if (x - 1 >= 0) { leftSum = table[y][x - 1]; }

      if (aboveSum === undefined && leftSum !== undefined) {
        table[y][x] = currVal + leftSum; 
      } else if (leftSum === undefined && aboveSum !== undefined) {
        table[y][x] = currVal + aboveSum;
      } else if (leftSum === undefined && aboveSum === undefined) {
        table[y][x] = currVal;
      } else {
        // either reached the end or we still thru the middle of the array's path
        const prevMinSum = Math.min(aboveSum, leftSum);
        table[y][x] = prevMinSum + currVal;
      }
    }
  }

  return table[grid.length - 1][grid[0].length - 1];
}

// Anecdote: I can further optimize solution by just comparing two solutions (the + bottom and + right solutions)
// Just add more conditional statements checking that there is a possible sum to check for there, and adjust the
// smallest sum accordingly for smaller subproblems
function minPathSumRecursive(grid, yIndex = 0, xIndex = 0, memo = {}) {
  // at any given point, I can move down an array or right to the next ele in the array
  // if I can no longer move right or down, I have reached the end of the path
  // return the minimum sum once I have reached the end
  // Edit: Only allow my algorithm to go through legal paths, bc counting illegal paths as messes up 
  //       continued. my calculations for minimum sum
  const key = `${yIndex} ${xIndex}`;
  if (key in memo) return memo[key];
  if (yIndex === grid.length - 1 && xIndex === grid[0].length - 1) return grid[yIndex][xIndex];

  let currVal = grid[yIndex][xIndex];
  let sums = [];
  if (yIndex + 1 < grid.length) sums.push(currVal + minPathSumRecursive(grid, yIndex + 1, xIndex, memo));
  if (xIndex + 1 < grid[0].length) sums.push(currVal + minPathSumRecursive(grid, yIndex, xIndex + 1, memo));

  // let minSum = Math.min(currVal + minPathSum(grid, yIndex + 1, xIndex), currVal + minPathSum(grid, yIndex, xIndex + 1));
  const minSum = Math.min(...sums);
  memo[key] = minSum;
  return memo[key];
}

// let arr = [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ];

let arr_two = [[0, 2, 2, 6, 4, 1, 6, 2, 9, 9, 5, 8, 4, 4], [0, 3, 6, 4, 5, 5, 9, 7, 8, 3, 9, 9, 5, 4], [6, 9, 0, 7, 2, 2, 5, 6, 3, 1, 0, 4, 2, 5], [3, 8, 2, 3, 2, 8, 8, 7, 5, 9, 6, 3, 4, 5], [4, 0, 1, 3, 9, 2, 0, 1, 6, 7, 9, 2, 8, 9], [6, 2, 7, 9, 0, 9, 5, 2, 7, 5, 1, 4, 4, 7], [9, 8, 3, 3, 0, 6, 8, 0, 8, 8, 3, 5, 7, 3], [7, 7, 4, 5, 9, 1, 5, 0, 2, 2, 2, 1, 7, 4], [5, 1, 3, 4, 1, 6, 0, 4, 3, 8, 4, 3, 9, 9], [0, 6, 4, 9, 4, 1, 5, 5, 4, 2, 5, 7, 4, 0], [0, 1, 6, 6, 4, 9, 2, 7, 8, 2, 1, 3, 3, 7], [8, 4, 9, 9, 2, 3, 8, 6, 6, 5, 4, 1, 7, 9]];

// console.log(minPathSumRecursive(arr_two));
// console.log(minPathSum(arr_two));
console.log(minPath1D(arr_two));