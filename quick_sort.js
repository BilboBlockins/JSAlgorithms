
//Quick Sort:

//Like merge sort, exploits the fact that arrays that are 1 or 0 items long are always sorted
//Works by selecting one element(called the "pivot") and finding the index where
//the pivot should end up in the sorted array and moving it there (somewhere in the middle).
//With the pivot positioned, can recursivley do this to the two sides of the array.

//PSEUDOCODE for Pivot Helper

//Pivot Helper - pivot is chosen.
//all values greater than the pivot are moved to the right of the pivot
//all values less than the pivot are moved to the left.
//the pivot is important - ideally it is the median value in the data set.
//for simplicity, we will just pick the first item;

//so pivot() will accept arr, start, and end
//grab the pivot from the start of the array;
//Store the current pivot index in a variable (will keep track of where the pivot should go)
//Loop through the array from the start until the end
//if the pivot is greater than the current element, increment the pivot index variable and then (at the very end) swap the curent el with the el at the pivot.

var arr = [4,8,2,1,5,7,6,3];

function pivot(array, start=0, end=array.length -1){
	let swapIndex = start; //where the pivot should go at the end
	let pivot = array[start]; // probably a better way to pick the pivot

	const swap = (arr, idx1, idx2) => {
		return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]; //new way of swaping data;
	}

	//loop over everything after start
	for(let i= start +1; i<array.length; i++)
	{
		if(pivot > array[i]){
			swapIndex++;
			swap(array, swapIndex, i);
		}
	}

	//before returning pivot (at start) should be swapped into the right position (swapIndex)
	swap(array, start, swapIndex);
	return swapIndex;
}

//QuickSort PSEUDOCODE
//We are not making new arrays
//We are going to check if the sub array length is one

function quickSort(array, left=0, right=array.length -1){

	if(left < right){ //base case - when we are only sorting 1 item

		let pivotIndex = pivot(array, left, right);

		//left
		quickSort(array, left, pivotIndex-1);//-1 so we do not include the pivot

		//right
		quickSort(array, pivotIndex+1, right);
	}
	return array;
}

quickSort(arr);

//Best Case: O(n log n)
//Worst Case: The data is always sorted and we take the first item
//Worst Case: O(n^2)
//Problem when the pivot is the largest or the smallest