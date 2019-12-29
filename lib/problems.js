// Write a function, stepper(nums), that takes in an array of non negative numbers.
// Each element of the array represents the maximum number of steps you can take from that position in the array.
// The function should return a boolean indicating if it is possible to travel from the 
// first position of the array to the last position.
//
// For Example:
//
// Given [3, 1, 0, 5, 10]
//      - We begin at first position, 3. 
//      - Since the element is 3 we can take up to 3 steps from this position.
//      - This means we can step to the 1, 0, or 5
//      - Say we step to 1
//      - Since the element is 1, now the only option is to take 1 step to land on 0
//      - etc...
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
// stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
// stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end
function stepperRecursive(nums, memo = {}, index = 0) {
    // what is the smallest case? 
    // we have no more steps to take, aka the value is 0
    // we start at index 0
    // if the distance between our curr position and the last position (i.e. index 4 - index 2 = 2) is smaller than our curr value
    // we can't make it; otherwise, our current value may be equal or bigger and we can make it
    // when we can't make it, we have the option between m options (where m is the value of the current value)
    // doing top-down first

    // Base cases
    if (index in memo) {
        return memo[index];
    }

    let maxStep = nums[index];
    if (index >= nums.length - 1) return true;
    if (maxStep === 0) return false;

    // Now use the maxStep to make a call for each step from 1 to maxStep
    for (let step = 1; step <= maxStep; step++) {
        let isPossible = stepper(nums, memo, index + step);
        if (isPossible) {
            memo[index] = isPossible;
            return isPossible;
        }
    }

    memo[index] = false;
    return false;
}

// Iterative
function stepper(nums) {
    // smallest case is index of 0
    // if the current index is equal to the last index of the input array, we return true
    // if the current index is not equal to the last index, and is 0, we return false
    // otherwise, we take this current step as the current maximum step
    // step from 1 to maximum step 
    let maxSteps = [nums[0]];
    let currIndex = 0;
    // could have length of nums for outer loop
    while (maxSteps.length > 0) {
        if (currIndex >= nums.length - 1) return true;

        let currentMaxStep = maxSteps.pop();
        if (currentMaxStep === 0) return false;

        // iterate thru the nums input from 1 to currentMaxStep to find the next maximum step
        let nextMaxStep = 0;
        let nextHighestIndex = currIndex;
        for (let step = 1; step <= currentMaxStep; step++) {
            let nextNum = nums[currIndex + step];
            if (nextNum >= nextMaxStep) {
                nextMaxStep = nextNum;
                nextHighestIndex = currIndex + step;
            }
            // nextMaxStep = Math.max(nextMaxStep, nextNum);
        }
        // push this nextMaxStep into our array;
        // update currIndex 
        maxSteps.push(nextMaxStep);
        currIndex = nextHighestIndex;
    }
}


// Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative numbers.
// The function should return the maximum sum of elements in the array we can get if we cannot take
// adjacent elements into the sum.
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// maxNonAdjacentSum([2, 7, 9, 3, 4])   // => 15, because 2 + 9 + 4
// maxNonAdjacentSum([4,2,1,6])         // => 10, because 4 + 6 
function maxNonAdjacentSumRecursive(nums, memo = {}, startIndex = 0, endIndex = nums.length) {
    const key = `${startIndex} ${endIndex}`;
    if (key in memo) return memo[key];
    if (startIndex >= endIndex) return 0;
    if (startIndex === endIndex - 1) return nums[startIndex];
    
    // for each number, it can take a number 2 or more indices away
    // then that number can also sum another number 2 or more indices ahead of it
    // drawing a tree, we start with our current index, and get the maxAdjacentSum by iterating thru the 
    // nums input and get smaller sums, eliminating adjacent inputs in subsequent subproblems
    // I will save an index instead of slicing my array to save space
    let maxSum;
    //  console.log(`Start index: ${startIndex}, End index: ${endIndex}`); 
    for (let i = startIndex; i < endIndex; i++) {
        const currNum = nums[i];
        // let beforeSum = maxNonAdjacentSum(nums, 0, i - 1);
        let afterSum = maxNonAdjacentSum(nums, memo, i + 2, endIndex);
        let possibleSum = currNum + afterSum;

        if (!maxSum) {
            maxSum = possibleSum;
        } else {
            maxSum = Math.max(maxSum, possibleSum);
        }

    } 
    memo[key] = maxSum;
    return maxSum;
}

// Iterative
function maxNonAdjacentSum(nums) {
    // make an array of sums?
}


// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// You've seen this problem before with memoization, but now solve it using the Tabulation strategy!
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100
function minChange(coins, amount) {

}


module.exports = {
    stepper,
    maxNonAdjacentSum,
    minChange
};


// console.log(stepperIterative([2, 3, 1, 1, 0, 4, 7, 8]));  
console.log([4,2,1,6]);
console.log(maxNonAdjacentSum([4,2,1,6]));