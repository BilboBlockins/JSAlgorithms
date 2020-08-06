//Multiple Pointers
//Concept: if we move the first and the last pointer we iterate less.
//time complexity - O(n)
//space complexity - O(1)

function sumZero(arr){
	let left =0;
	let right = arr.length -1;
	while(left<right){
		let sum = arr[left] + arr[right];
		if(sum===0){
			return [arr[left], arr[right]];
		}else if(sum > 0){
			right--;
		}else{
			left++;
		}
	}

}

function countUniqueValues(arr){
	var i = 0;

	if(arr.length === 0 ) 
		return 0;

	for(var j = 1; j < arr.length; j++){
		if(arr[i] !== arr[j]){
			i++;
			arr[i] = arr[j];
		}
	}
	return i+1;
}

sumZero([-4,-3,-2,-1,0,1,3,10]) //will return [-3, 3]
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]);//return 7

