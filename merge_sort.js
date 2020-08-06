//Merge Sort:

//Uses a process of splitting, merging, and sorting - divide and conquer.
//Exploits the fact that arrays of 0 or 1 elements are already sorted.
//Decomposes the array into single element arrays and then merge/sorts back into a sorted array.
//It is easier to merge arrays that are already sorted.

//Function to merge 2 sorted arrays:
//Pseudocode:
//Create an empty array and look at the smallest values in each input array (arr1 and arr2)
//If the value in arr1 is smaller than the value in arr2, push the arr1 value in the results array
//and move on to the next arr1 value
//If larger, push the arr2 value into the results array
//and move on the the next arr2 value
//Once one array is exhausted, push all the remaining values from the other array.

function mergeSorted(arr1, arr2) {
	let results = [];
	let i = 0;
	let j = 0;
	//while there are items in both arrays
	while(i < arr1.length && j < arr2.length) {
		// compare i and j values and push the smaller value
		if( arr2[j] > arr1[i] ) {
			results.push(arr1[i]);
			i++;
		} else {
			results.push(arr2[j]);
			j++;
		}
	}
	//push the remaining sorted values
	while(i < arr1.length) {
		results.push(arr1[i])
		i++;
	}
	while(j < arr2.length) {
		results.push(arr2[j])
		j++;
	}
	return results;
}

// Pseudocode:
// Recursively break array into halves until you have arrays that are empty or only 1 element
// After breaking down the array, call the mergeSorted function to put the sorted arrays back together

function mergeSort(arr) {
	//base case - array is 0 or 1 items
	if(arr.length <= 1) return arr;
	//split the array at the midpoint
	let mid = Math.floor(arr.length/2);
	let left = mergeSort(arr.slice(0, mid)); //splits/merges whole left
	let right = mergeSort(arr.slice(mid)); //splits/merges whole right
	//merge sorted arrays
	return mergeSorted(left, right);
} 

mergeSort([100,14,50,2,1,10,99]);
// returns:
// [1, 2, 10, 14, 50, 99, 100]

// Operations:
// O(n log n) - time complexity... nice
// O(n) - space complexity... not great