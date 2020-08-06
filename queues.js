//Queues:

//A data structure that follows the FIFO, first in first out, pattern.
//Like a people standing in line, or a printing something.
//Can be implemented with an array using unshift and pop, but this is not ideal because unshift requires the whole array to be reindexed.
//Like a linked list using push and shift.
//A good queue should enqueue and dequeue with constant time O(1).

class queueNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	//push a node onto the tail of the list
	enqueue(val) {
		//make a new node with the value
		let newNode = new queueNode(val);
		//If the current list is empty (no head)
		if (!this.head) {
			//Both head and tail should be the new node
			this.head = newNode;
			this.tail = newNode;
		} else {
			//otherwise set the next property on the tail to the new node
			this.tail.next = newNode;
			//set the list tail to the new node
			this.tail = newNode;
		}
		//increment the list length by 1 and return the list length
		this.length++;
		return this.length;
	}
	//remove an item from the head of the list
	dequeue() {
		if(!this.head) { return undefined };
		let currentHead = this.head;
		//for case where there was only 1 item
		if(this.length === 1) {
			//set head and tail back to null
			this.head = null;
			this.tail = null;
		}
		this.head = currentHead.next;
		this.length--;
		return currentHead.val;
	}
}

let queue = new Queue();
queue.enqueue("First");
queue.enqueue("Second");
queue.enqueue("Third");
queue.dequeue(); // First
queue.dequeue(); // Second
queue.dequeue(); // Third