//Radix Sort:

//Sorts numbers (this example for base 10) or binary - different than comparison sorts in that instead of comparing 2 values
//it exploits the fact that information about the size of a number is encoded in the number of digits

//Pseudocode:
//Figure out how many digits the largest number has to determine how many times we must iterate through array
//For each iteration, create an array of bucket arrays for each digit (0-9)
//Put each number in the corresponding bucket based on its Kth digit
//Reform the existing array with values pushed into each bucket array starting with 0 and going to 9
//Return the list at the end

//Helper methods:

//returns digit in digit's place
function getDigit(num, place) {
	return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
//returns how many digits
function digitCount(num) {
	if(num === 0) return 1; //edge case
	return Math.floor(Math.log10(Math.abs(num))) + 1; //log10 finds what power of 10=num
}
//returns the maximum digit count in the array
function mostDigits(arr) {
	let maxDigits = 0;
	for(let i=0; i<arr.length; i++){
		maxDigits = Math.max(maxDigits, digitCount(arr[i]));
	}
	return maxDigits;
}

function radixSort(arr) {
	// Find the max number of digits for a number in the array
	let maxDigitCount = mostDigits(arr);
	let length = arr.length;
	// For each digit
	for(let k=0; k<maxDigitCount; k++) {
		// Create an array of bucket arrays fro each digit
		let digitBuckets = Array.from({length:10}, () => [] );
		// For each number in the array
		for(let i=0; i<length; i++) {
			// find the digit in the kth place
			let digit = getDigit(arr[i], k);
			// push the number into the corresponding digit bucket
			digitBuckets[digit].push(arr[i]);
		}
		//reform the array for the next digit place
		arr = [].concat(...digitBuckets)
	}
	return arr
}


radixSort([12, 9852, 23, 345, 2345, 5467]);
//Returns:
//[12, 23, 345, 2345, 5467, 9852]

//Operations:
//O(nk) - time complexity - nice
//O(n+k) - space complexity - nice