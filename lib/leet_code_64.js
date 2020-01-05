// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

// Given a mxn grid (2D) of non-neg #s, find a path from top left to bottom right which minimizes the sum of all
// numbers in its path
// can only move +1 to the right (same array) or +1 to the bottom (next corresponding array)
function minPathSum(grid) {

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

let arr = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];
console.log(arr);
console.log(minPathSumRecursive(arr));