//Stacks:

//A data structure that follows the LIFO, last in first out, pattern.
//Like a stack of books or papers - removed from the top.
//A program's call stack works like this.
//Basically a linked list with push and pop methods.
//Could use an array but indices aren't really needed.
//Pushing and popping for a stack should be constant time O(1)

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class Stack {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	//add a node to the head of the list
	push(val) {
		let newNode = new Node(val)
		//If the current list is empty (no head)
		if (!this.head) {
			//Both head and tail should be the new node
			this.head = newNode;
			this.tail = newNode;
		} else {
			//add the new node to the front and update the head
			newNode.next = this.head;
			this.head = newNode;
		}
		//increment the list length by 1 and return the stack length
		this.length++;
		return this.length;
	}
	//remove an item from the head of the list
	pop() {
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

let stack = new Stack();
stack.push("stack");
stack.push("new");
stack.push("a");
stack.pop();
stack.pop();
stack.pop();
