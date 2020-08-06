//Bubble Sort:

//Not at all efficient - O(n^2) - yikes
//but it is a simple algorithm.
//It works best in situations where data is already almost sorted (get close to O(n) in this case)

//Pseudocode:
//Start looping from the index (i) at the end of the array to the start
//Start inner loop with from the index (j) at the beginning of the loop to i-1
//if the value at index j is greater than the value at j+1 - swap them
//if the inner loop completes without making any swaps - break (the data is sorted here and you don't need to continue looping)
//return the sorted array

function bubbleSort(arr) {
	let sortedFlag;
	for(let i=arr.length; i>0; i--) {
		sortedFlag = true;
		for(let j=0; j<i-1; j++) {
			if(arr[j] > arr[j+1]) {
				let temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				sortedFlag = false;
			}
		}
		if(sortedFlag) break;
	}
	return arr;
}

bubbleSort([13,24,1,36,8,3,40,2]);
// returns [1, 2, 3, 8, 13, 24, 36, 40]