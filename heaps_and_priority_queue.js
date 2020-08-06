
//HEAPS:

//There are many different types of heaps:
//Min and max binary heaps are implemented here:
//For a binary heap each node can have only 2 children at most.
//Unlike a binary search tree, there is no order.
//Max and Min Binary heaps:
//A max binary heap has all the parent node larger than their children.
//A min binary heap has all the children nodes larger than their parents.
//A heap is as compact as possible - every left and right is filled before moving down.
//left children are filled out first (left to right for each level).
//heaps are used to implement priority queues
//they are often used with graph traversal

//for any index of an array n;
//lchild of parent in a heap array is at 2n + 1
//lchild of parent in a heap array is at 2n + 2
//to find the parent (n-1)/2 (integer division)

//Inserting values:
//To add to a binary heap array, you start by putting the value at the end (pushing)
//then, you bubble it up into its parents until the heap is correct.

//PSEUDOCODE FOR INSERT
//Push the value into the values array on the heap
//Bubble up:
	//Create a variable called index which is the length of the values array -1
	//Create a variable called parentIndex which is Math.Floor((index-1)/2);
	//While the value at parentIndex is < the value at index
		//-swap the values
		//-set the index to the parent index - restart the loop

//extractMax
//We often uses heaps to extract the max values (highest priority), over and over.
//First we just take the root off (the max)
//Then we bubbleDown to find the largest item in the heap

//extractMax PSEUDOCODE // similar for extractMin
//swap the root with the last value
//pop the root value from the end and save to a variable so you can return it at the end
//have the new root bubbleDown
	//starting at 0
	//find the index of the left child (2*index + 1) (check for out of bounds)
	//find the right child
	//if the left or right are larger than the element at the root - swap, if both left and right children are larger, 
	//compare and swap with the largest one.
	//the child you swapped is now the parent
	//keep looping and swapping until the child is larger that the element.
	//return the old root.

//PRIORITY QUEUE
//A data structure where each element has a priority.
//Elements with higher priorities are served before elements with lower priorities.
//You can use priority queues any time you need to manage anything with a priority
//Not the same as a heap - PQ are a separate idea
//Can implement PQ with an array, but it would be really slow. Heaps make it faster O(log n).

//Max Binary Heap
class MaxBiHeap {
	constructor(){
		this.values = [];
	}

	insert(item){

		const values = this.values;
		values.push(item);

		function bubbleUp(){

			let index = values.length - 1;
			const element = values[index];

			while(index>0)
			{
				let parentIndex = Math.floor((index-1)/2);
				let parent = values[parentIndex];

				if(element <= parent)
					break;

				values[parentIndex] = element; //swap
				values[index] = parent;
				index = parentIndex;
			}

		}

		bubbleUp();
	}

	extractMax(){ // look for shorter refactor or use recursion

		const values = this.values
		const max = this.values[0];
		const end = this.values.pop(); //pops off the last item

		function bubbleDown(){
			let index = 0; 
			const element = values[0];

			while(index < values.length-1)
			{
				let leftIndex = 2*index + 1;
				let rightIndex = 2*index + 2;
				let leftChild, rightChild;
				let swap = null;

				if(leftIndex < values.length){ // if in bounds
					leftChild = values[leftIndex];
					if(leftChild > element)
						swap = leftIndex;
				}

				if(rightIndex < values.length){ // if in bounds
					rightChild = values[rightIndex];
					if(
						(swap === null && rightChild > element) || //max
						(swap !== null && rightChild > leftChild) //max
					) {
						swap = rightIndex;
					}
				}
				if(swap === null)
					break;

				values[index] = values[swap];
				values[swap] = element;

				index = swap;
			}
		}

		if(values.length > 0){ //check for last item
			this.values[0] = end;
			bubbleDown();
		}

		return max;
	}

};

let maxHeap = new MaxBiHeap();

maxHeap.insert(39);
maxHeap.insert(49);
maxHeap.insert(20);
maxHeap.insert(10);
maxHeap.insert(15);

maxHeap.extractMax(); // returns 49
maxHeap.extractMax(); // returns 39


//Node class to include element priority
class Node{
	constructor(entry, priority){
		this.entry = entry;
		this.priority = priority;
		this.insertTime = Date.now(); //could prioritize any duplicate items
	}
}

//Min Binary heap used as a Priority Queue:
class MinBiHeap {
	constructor(){
		this.values = [];
	}
	insert(entry, priority){ //could change this to Enqueue
		let newNode = new Node(entry, priority);
		const values = this.values;
		values.push(newNode);

		function bubbleUp(){
			let index = values.length - 1;
			const node = values[index];
			while(index>0)
			{
				let parentIndex = Math.floor((index-1)/2);
				let parent = values[parentIndex];

				if(node.priority >= parent.priority) //min
					break;

				values[parentIndex] = node; //swap
				values[index] = parent;
				index = parentIndex;
			}
		}

		bubbleUp();
	}

	extractMin(){ // could change to dequeue

		const values = this.values
		const min = this.values[0]; //min value
		const end = this.values.pop(); //pops off the last item

		function bubbleDown(){
			let index = 0; 
			const element = values[0];

			while(index < values.length-1)
			{
				let leftIndex = 2*index + 1;
				let rightIndex = 2*index + 2;
				let leftChild, rightChild;
				let swap = null;

				if(leftIndex < values.length){ // if in bounds
					leftChild = values[leftIndex];
					if(leftChild.priority < element.priority) //min
						swap = leftIndex;
				}

				if(rightIndex < values.length){ // if in bounds
					rightChild = values[rightIndex];
					if(
						(swap === null && rightChild.priority < element.priority) || //min
						(swap !== null && rightChild.priority < leftChild.priority) //min
					) {
						swap = rightIndex;
					}
				}
				if(swap === null)
					break;

				values[index] = values[swap];
				values[swap] = element;

				index = swap;
			}
		}

		if(values.length > 0){ //check for last item
			this.values[0] = end;
			bubbleDown();
		}
		return min;
	}

};

let ER = new MinBiHeap();

ER.insert("Brain Dead", 10);
ER.insert("Cut off hand", 2);
ER.insert("Bomb in butt", 1);
ER.insert("Anti-Vax measles", 8);
ER.insert("Craziness", 6);

ER.extractMin();
ER.extractMin();

//Operation Complexity for binary heaps:
//Insertion - O(log n) - nice
//Removal - O(log n) - nice
//Search - O(n) - ok

