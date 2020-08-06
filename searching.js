//Searching Algorithms:

//Linear Search:
//Simple iterating through a list until a match is found - O(n)
//this function returns the match index or -1

function linearSearch(arr, val) {
	for(let i=0;i<arr.length;i++) {
		if(arr[i] === val) return i;
	}
	return -1;
}

//Binary Search:
//Only works with sorted array.
//Binary search cuts down operations by splitting the list each loop - O(log n) - nice
//Psuedocode:
//For a sorted array and a value
//Create a left pointer at the start of the array and a right pointer at the end
//While the left pointer comes before the right pointer,
//Create a pointer in the middle
//if you find the value you want return the index
//if the value is too small, set the left pointer as the middle pointer
//if the value is too large, set the right pointer as the middle pointer
//if you never find a value, return -1

function binarySearch(arr, val) {
	let start = 0;
	let end = arr.length - 1;
	let middle = Math.floor((start + end)/2);
	while(arr[middle] !== val && start <= end) {
		if(val < arr[middle]) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
		middle = Math.floor((start + end)/2);
	}
	if(arr[middle] === val) {
		return middle;
	}
	return - 1;
}

//Naive String Search:
//Search through a whole string until a specific substring pattern is found - O(mn), not great
//Psuedocode:
//For a longer string and a string search pattern
//Loop over the longer string 1 character at a time
//For each character, try looping over the search string
//if the characters don't match, break out of the inner loop.
//if they do match, keep check each character in the search string with the characters in the whole string
//if the inner loop completes, a match is found - increment the count of matches;
//return the count.
//if not found return -1;

function naiveStringSearch(str, pattern) {
	let count = 0;
	for(let i=0; i<str.length; i++) {
		for(let j=0; j<pattern.length; j++) {
			if(pattern[j] !== str[i+j]) {
				break;
			}
			if(j === pattern.length - 1) {
				count++;
			}
		}
	}
	if(count) {
		return count;
	}
	return -1;
}

naiveStringSearch("the quick brown fox jumped over the lazy dog", "the");
//returns 2

//Knuth Morris Pratt (KMP) string matching
//Significant improvement over Naive String search - O(n)
//because whenever a mismatch is detected (after some matches), 
//we already know some of the characters in the text of the next window,
//so we can avoid matching characters that we already know will match.
//The algorithm has 2 parts, the search and a preprocessor called Longest Prefix/Suffix - lps.

//Psuedocode:
//For a string and a pattern
//let s be the currently matched character prefix of the pattern
//If t is some proper suffix of s that is also a prefix of s, then we already have a partial match for t.
//Compute the lps t with this property, and see if the next characte matches the character in the pattern that comes after the prefix t.
//If yes, we advance the pattern index and the text index.
//If no, we repeat this suffix/prefix process until the prefix is empty and we still fail to match the next character.

function kmpSearch(str, pattern) {
	//if there is no pattern return 0 matches
	if (pattern.length === 0) return 0;
	let lps = [0];
	let count = 0;
	let j = 0;
	//To find the lpsfor each character in the pattern starting from 1
	for (let i=1; i<pattern.length; i++) {
		//set j to the next element
		let j = lps[i - 1];
		//while j is greater than 0 and the pattern characters at i and j don't match
		while (j > 0 && pattern.charAt(i) !== pattern.charAt(j)){
			//subtract a position from j
			j = lps[j - 1];		
		}
		//if the characters at position i and j match
		if (pattern.charAt(i) === pattern.charAt(j)) {
			//add one to j
			j++;
		}
		//push j into the lps
		lps.push(j);
	}
	// for each char in the string
	for (let i = 0; i < str.length; i++) {
		//while j is greater than 0 and the pattern character doesn't match the one in the string
		while (j > 0 && str.charAt(i) !== pattern.charAt(j)) {
			// Go one position back in the pattern
			j = lps[j - 1];  
		}
		//if a character is matched
		if (str.charAt(i) === pattern.charAt(j)) {
			//increment
			j++;
			//if the complete pattern is found
			if (j === pattern.length) {
				//increment the counter
				count++;
				//note i - (j - 1) will give index
			}
		}
	}
	if(count) {
		return count;
	}
	return -1;
}

kmpSearch("the quick the brown the fox jumped over the lazy dog", "the");
//returns 4