
//Selection Sort:
//Starting with the first item in an array, we set a min (or max) value, and look through 
//the whole array to find any values that are smaller(or bigger).
//At the end, we either swap the smallest value with the first index or the largest value with the last index.

//PSEUDOCODE:
//Store the first element as the smallest value
//Compare this min element to the next item until you find a smaller number
//At the end of the loop
//if a smaller value is found
//swap at the end
//O(n^2)

arr = [3,2,5,6,2,9];

function selectionSort(array){

	let cursor;
	let minIndex;
	let tempVal;

	for(let i=0; i<array.length; i++){
		minIndex = i;

		for(cursor = i+1; cursor<array.length; cursor++){
			if(array[cursor] < array[minIndex]){
				minIndex= cursor;
			}
		}

		if(i != minIndex) // stops needless swaps
		{
			tempVal = array[i]; //swap - should use es2015 syntax here for swap
			array[i] = array[minIndex];
			array[minIndex] = tempVal;
		}
	}
	return array;
}

selectionSort(arr);

//ES2015
//=================

arr = [3,2,5,6,2,9];

function selectionSort(array){

	let cursor;
	let minIndex;
	let tempVal;

	const swap = (arr, idx1, idx2) => {
		return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]; //new way of swaping data;
	}

	for(let i=0; i<array.length; i++){
		minIndex = i;

		for(cursor = i+1; cursor<array.length; cursor++){
			if(array[cursor] < array[minIndex]){
				minIndex= cursor;
			}
		}

		if(i != minIndex) // stops needless swaps
			swap(arr,i,minIndex);
	}
	return array;
}

selectionSort(arr);