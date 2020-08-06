//Singly Linked List:

//An ordered data structure like an array but without mapped indices
//All the elements are linked nodes that point to the next and previous nodes
//A doubly linked list has a head, tail, and a length property
//Each node has a data value it stores and a pointer to the next node, the previous or null (the end)
//To find a value you have to start at the head and iterate to the tail.
//Adding an item to the head or tail is very easy and adding an item doesn't require all the items to be reindexed
//doubly linked lists have the advantage of not having to iterate the list to remove the last item.
//also much easier to iterate the list backwards unlike the singly linked list.
//No random access but good for simple insertion or deletion for large data sets.
//Uses more memory, but is more flexible.

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.previous = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	//push a node onto the tail
	push(val) {
		//make a new node with the value
		let newNode = new Node(val);
		//If the current list is empty (no head)
		if (!this.head) {
			//Both head and tail should be the new node
			this.head = newNode;
			this.tail = newNode;
		} else {
			//otherwise set the next property on the tail to the new node
			this.tail.next = newNode;
			newNode.previous = this.tail;
			//set the list tail to the new node
			this.tail = newNode;
		}
		//increment the list length by 1 and return the list
		this.length++;
		return this;
	}
	//remove the tail from the list
	pop() {
		//if the list is empty return nothing
		if(!this.head) { return undefined };
		let poppedNode = this.tail
		//if you are popping the last item
		if(this.length === 1) {
			//set head and tail back to null
			this.head = null;
			this.tail = null;
		} else {
			//otherwise set the tail to the node before poppedNode
			this.tail = poppedNode.previous;
			//set next on the tail and previous on the popped node to null
			this.tail.next = null;
			poppedNode.previous = null;
		}
		//decrement
		this.length--;
		return poppedNode;
	}
	//remove an item from the head of the list
	shift() {
		if(!this.head) { return undefined };
		let currentHead = this.head;
		//for case where there was only 1 item
		if(this.length === 1) {
			//set head and tail back to null
			this.head = null;
			this.tail = null;
		} else {
			//set head to next
			this.head = currentHead.next;
			//reset head's previous
			this.head.previous = null;
			//remove old heads node connection
			currentHead.next = null;
		}
		//decrement
		this.length--;
		return currentHead;
	}
	//add a node to the head of the list
	unshift(val) {
		let newNode = new Node(val)
		//If the current list is empty (no head)
		if (!this.head) {
			//Both head and tail should be the new node
			this.head = newNode;
			this.tail = newNode;
		} else {
			//set the current head previous to point to new node
			this.head.previous = newNode
			//add the new node to the front and update the head
			newNode.next = this.head;
			this.head = newNode;
		}
		//increment the list length by 1 and return the list
		this.length++;
		return this;
	}
	//gives us the item at an index
	get(index) {
		let current = null;
		//edge cases - negative index or greater or index out of range - return null
		if(index < 0 || index >= this.length) { return null };
		//if the index is closer to the front
		if(index <= this.length/2) {
			let counter = 0;
			current = this.head;
			//loop forwards until index is reached
			while(counter !== index) {
				current = current.next;
				counter++;
			}
		} else {
			let counter = this.length - 1;
			current = this.tail;
			//loop backwards until index is reached
			while(counter !== index) {
				current = current.previous;
				counter--;
			}
		}
		//return current item at the index
		return current;
	}
	// sets a value at an index and returns true or returns false if no index found 
	set(index, val) {
		let foundNode = this.get(index);
		if(foundNode) {
			foundNode.val = val;
			return true;
		}
		return false;
	}
	//inserts new node at a specified index
	insert(index, val) {
		//negative index or index out of bounds
		if(index < 0 || index > this.length) { return false };
		//inserting at the beginning and returning bool
		if (index === 0) { return !!this.unshift(val); }
		//inserting at the end and return bool
		if (index === this.length) { return !!this.push(val); }
		//inserting in the middle
		//make a new node and get the node before insertion index
		let newNode = new Node(val);
		let previousNode = this.get(index-1);
		let previousNext = previousNode.next;
		//set prev to new and new next to prev next
		previousNode.next = newNode;
		newNode.next = previousNext;
		newNode.previous = previousNode;
		//increment the length and return true
		this.length++;
		return true;
	}
	//removes a node at a specified index
	remove(index) {
		//negative index or index out of bounds
		if(index < 0 || index >= this.length) { return undefined };
		//removing at the beginning
		if (index === 0) { return this.shift(); }
		//removing at the end
		if (index === this.length-1) { return this.pop(); }
		//removing from the middle
		let removedNode = this.get(index);
		//point the previous and next node over the removed
		removedNode.previous.next = removedNode.next;
		removedNode.next.previous = removedNode.previous;
		//remove leftover pointers
		removedNode.previous = null;
		removedNode.next = null;
		//decrement the length and return the removed node
		this.length--;
		return removedNode;
	}
	// prints the linked list as an array
	print() {
		let arr = [];
		let current = this.head;
		while(current) {
			arr.push(current.val);
			current = current.next;
		}
		console.log(arr);
	}
}

//Test:
let list = new DoublyLinkedList();

list.push("this");
list.push("is");
list.push("not");
list.get(1);
list.insert(2, "are");
list.print();
//["this", "is", "are", "not"]
list.insert(4,"wrong");
list.set(1, "list");
list.print();
//["this", "list", "are", "not", "wrong"]
list.pop();
list.push("right");
list.shift();
list.unshift("linked");
list.unshift("doubly");
list.print();
//["doubly","linked", "list", "are", "not", "right"]
list.set(3, "list");
list.unshift("this");
list.insert(0,"Wow,");
list.remove(5);
list.print();
//["Wow,", "this", "doubly", "linked", "list", "not", "right"]
list.set(6, "cool");
list.set(5, "is");
list.print();
//["Wow,", "this", "doubly", "linked", "list", "is", "cool"]

//Operation complexity:
//Insertion: O(1) - nice
//Removal: O(1) or O(n) - pretty nice, great for removing at end
//Searching: O(n)
//Access: 0(n)