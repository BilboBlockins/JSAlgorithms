//Singly Linked List:

//An ordered data structure like an array but without mapped indices
//All the elements are linked nodes that point to the next node
//A singly linked list has a head, tail, and a length property
//Each node has a data value it stores and a pointer to the next node or null (the end)
//To find a value you have to start at the head and iterate to the tail.
//Adding an item to the head or tail is very easy and adding an item doesn't require all the items to be reindexed
//No random access but good for insertion or deletion for large data sets.

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class SinglyLinkedList {
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
		//set current and new tail to head
		let current = this.head;
		let newTail = this.head;
		//iterate until current.next = null to get item before tail
		while(current.next) {
			newTail = current;
			current = current.next;
		}
		//set new tail with next as null
		this.tail = newTail;
		this.tail.next = null;
		//decrement the length
		this.length--;
		//for case where there was only 1 item
		if(this.length === 0) {
			//set head and tail back to null
			this.head = null;
			this.tail = null;
		}
		return current;
	}
	//remove an item from the head of the list
	shift() {
		if(!this.head) { return undefined };
		let currentHead = this.head;
		this.head = currentHead.next;
		this.length--;
		//for case where there was only 1 item
		if(this.length === 0) {
			//set head and tail back to null
			this.head = null;
			this.tail = null;
		}
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
			//add the new node to the front and update the head
			newNode.next = this.head;
			this.head = newNode;
			//increment the list length by 1 and return the list
			this.length++;
			return this;
		}
	}
	//gives us the item at an index
	get(index) {
		let counter = 0;
		let current = this.head;
		//edge cases - negative index or greater or index out of range - return null
		if(index < 0 || index >= this.length) { return null };
		//loop until index is reached
		while(counter !== index) {
			current = current.next;
			counter++;
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
		let previousNode = this.get(index-1);
		let removedNode = previousNode.next;
		previousNode.next = removedNode.next;
		//decrement the length and return the removed node
		this.length--;
		return removedNode;
	}
	//reverse linked list in place
	reverse() {
		//save the head into current node and swap the head and tail
		let current = this.head;
		let previous = null;
		let next;
		let counter = 0;
		this.head = this.tail;
		this.tail = current;

		//iterate until the end of the linked list
		while(counter !== this.length) {
			//save the node after the current node to get the node that should be before it
			next = current.next;
			//set the next node to the previous one
			current.next = previous;
			//set the previous node to the current one
			previous = current;
			//move node to the next one up
			current = next;
			//increment counter
			counter++;
		}
		return this;
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
let list = new SinglyLinkedList();

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
list.print();
//["linked", "list", "are", "not", "right"]
list.set(2, "is");
list.unshift("this");
list.insert(0,"Wow,");
list.remove(4);
list.print();
//["Wow,", "This", "linked", "list", "not", "right"]
list.set(5, "cool");
list.set(4, "is");
list.print();
//["Wow,", "this", "linked", "list", "is", "cool"]
list.reverse();
list.print();
//["cool", "is", "list", "linked", "this", "Wow,"]
list.reverse();
list.print();
//["Wow,", "This", "linked", "list", "is", "cool"]

//Operation complexity:
//Insertion: O(1) - nice
//Removal: O(1) or O(n) - pretty nice
//Searching: O(n)
//Access: 0(n)