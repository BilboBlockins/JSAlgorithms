//Sliding Window Pattern:
//For something like finding the longest string of unique characters in a string
//or for finding the largest sum in array

function maxSubArraySum(arr, num){
	let maxSum = 0;
	let tempSum = 0;
	if(arr.length<num) 
		return null;

	for(let i = 0; i<num; i++){
		maxSum += arr[i];
	}

	tempSum = maxSum;

	for(let i = num; i<arr.length; i++){
		tempSum = tempSum - arr[i - num] + arr[i];
		maxSum = Math.max(maxSum, tempSum);
	}
	return maxSum;
}

maxSubArraySum([1,2,3,2,8,2],2) // would return 10
maxSubArraySum([1,2,5,2,8,1,5],4) // would return 17
maxSubArraySum([],4) //null