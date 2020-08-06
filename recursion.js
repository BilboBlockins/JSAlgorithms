//Recursion:

//A process or function that calls itself.
//JSON.parse, JSON.stringify use recursion.
//Must have a base case to stop its operation.

//Basic recursion:
function sumRange(num) {
	if(num === 1) return 1; //base case
	return num + sumRange(num-1);
}

sumRange(3);
//returns 3 + sumRange(2) // waiting on value
			//sumRange(2)
			//returns 2 + sumRange(1) // waiting
						//sumRange(1)
						//returns 1; 
						// So, working back up the call stack finally returns:
						//3 + (2 + (1)) = 6;

function factorial(num) {
	if(num === 1) return 1; //base case
	return num * factorial(num-1);
}

factorial(3);
//returns 3 * (2 * (1)) = 6
factorial(4);
//returns 4 * (3 * (2 * (1))) = 24

//Helper method recursion - an outer function with inner recursive function:
//good for problems where a value needs to be collected in a variable.
function collectOdds(arr) {
	let result = [];
	function helper(arrIn) {
		if(!arrIn.length) return; //base case
		if(arrIn[0] % 2 !== 0) {
			results.push(arrIn[0])
		}
		helper(arrIn.slice[0])
	}
	helper(arr);
	return result;
}
collectOdds([2,5,7,4,8,9,10]);
//returns [5,7,9]

//Pure recursion for collectOdds:
function collectOddsPure(arr) {
	let newArr = [];
	if(arr.length === 0) { return newArr }; // base case - arr passed in is empty
	if(arr[0] % 2 !== 0){ newArr.push(arr[0]) }; // 
	newArr = newArr.concat(collectOddsPure(arr.slice(1)));
	return newArr;
}

collectOddsPure([1+2+3]);
//before returning
//returns:
	//[1].concat(collectOddsPure([2,3]);
		//[].concat(collectOddsPure([3]);
			//[3].concat(collectOddsPure([]);
				//returns [];
				//So, working back up the call stack returns:
				//[].concat([].concat([3].concat([]))) = [1,3]
				//Or, more clearly:
				//[1] + [] + [3] + [] = [1,3]

//Recursive function that finds all numbers in an object and converts them to strings
function stringifyNumbers(obj) {
  var newObj = {};
  for (var key in obj) {
    if (typeof obj[key] === 'number') {
      newObj[key] = obj[key].toString();
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

stringifyNumbers({num1:0, num2: 3, obj1: {num3: 6}})
//returns {num1: "0", num2: "3", obj1: {num3: "6"}}

