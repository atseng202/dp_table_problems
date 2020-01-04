// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.

// Given: n is a positive integer for number of steps to reach the top of the stairs
// - and you can climb 1 or 2 steps each time 
// Find: the number of distinct ways to reach the top of the stairs
// example: n = 2
// There would be two ways to reach the top for a 2 step stairs
// 1 step + 1 step, 2 steps
// example 2: n = 3
// 1 + 1 + 1
// 1 + 2
// 2 + 1 

function climbStairs(n) {
  // our simplest case is n === 0
  // there is 1 way to climb no step stairs, do nothing
  // or for 1 step stairs, there is 1 way just climb 1 step
  // I can frame this problem similarly to the coin problem
  // the number of ways to walk 1 step is the same as walking 1 step + the number of ways to walk 0 steps (1 way)
  // same as 2 steps; walk 2 steps; then use the number of ways to walk from my current number of steps - 2;
  if (n === 1) return 1;
  if (n === 2) return 2;
  let ways = new Array(n + 1).fill(0);
  ways[0] = 1;
  ways[1] = 1;
  ways[2] = 2;

  for (let staircase = 3; staircase <= n; staircase++) {
    ways[staircase] += (ways[staircase - 1] + (ways[staircase - 2]));
  }

  return ways[n];
  
}

function climbStairsRecursive(n, memo = {}) {
  // base case
  // when there are no more steps to climb aka n = 0, we can return 0
  // and we will make a call each time to subtract n by 1 or 2
  if (n in memo) return memo[n];
  if (n === 0) return 1;

  let totalWays = 0;
  for (let steps = 1; steps <= 2; steps++) {
    if (n - steps >= 0) {
      totalWays += climbStairsRecursive(n - steps);
    }
  }
  memo[n] = totalWays;
  return totalWays;

}