//Tree traversal:

//How to visit every node 1 time:
//There are lots of different ways to traverse a tree.
//2 Main approaches Breadth First Search and Depth First Search.
//Breadth First Search is working across the tree. For example, root -> level 1 left to right -> level 2 left to right -> ...
//Depth First Search is working down the branches.
//Depth First Search can be done in different ways:
//InOrder: smallest to biggest (bottom far left up to bottom far right). Used to get nodes ordered by values.
//PreOrder: root down left, then root down right. Used to extract and copy a tree structure (same branches same root).
//PostOrder: left leaves to root, right leaves to root.
//DFS would be preferred for very wide trees (not a lot of depth, but many many branches).
//BFS would be preferred for very deep trees (not many branches, but very deep).

class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
} 

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	insert(val) {
		let newNode = new Node(val);
		if(!this.root) {
			// if the tree is empty, set as root
			this.root = newNode;
			return this;
		} else {
			let current = this.root;
			//loop until the node's place is found
			while(true) {
				// if the value already exists in the tree - ignore
				if(val === current.val) { return 'duplicate value - not storing'}
				if(val < current.val) {
					// the val is less than current and there is no left
					if(current.left === null) {
						// we found the new node's place
						current.left = newNode;
						return this;
					} else {
						//otherwise, update current down to the left
						current = current.left;
					}
				}
				if(val > current.val) {
					// if val is greater than current and there is no right
					if(current.right === null) {
						//we found the node's place
						current.right = newNode;
						return this;
					} else {
						//otherwise, update current down to the right
						current = current.right;
					}
				}
			}
		}
	}
	remove(val) {
		//if the tree is empty return false
		if(this.root === null) { return false };
		//get the node
		let nodeToRemove = this.find(val);
		//if the node is actually in the tree
		if (nodeToRemove) {
			//get the parent
			let parentNode = this.findParent(nodeToRemove.val);
			//if the node isn't the root (has parent)
			if(parentNode) {
				//if the node to remove has no children
				if(!nodeToRemove.right && !nodeToRemove.left){
					//if node is on left of parent
					if(nodeToRemove.val < parentNode.val) {
						//set parent left to null and delete node
						parentNode.left = null;
						nodeToRemove = null;
						return true;
					} else {
						//otherwise delete right side
						parentNode.right = null;
						nodeToRemove = null;
						return true;
					}
				}
				//if the node to remove has left only
				if(!nodeToRemove.right && nodeToRemove.left) {
					//if node is on left of parent
					if(nodeToRemove.val < parentNode.val) {
						//point parent node left to removed node left and delete
						parentNode.left = nodeToRemove.left;
						nodeToRemove = null;
						return true;
					} else {
						//point parent node right to removed node left and delete
						parentNode.right = nodeToRemove.left;
						nodeToRemove = null;
						return true;
					}
				}
				//if the node to remove has right only
				if(nodeToRemove.right && !nodeToRemove.left) {
					//if node is on left of parent
					if(nodeToRemove.val < parentNode.val) {
						//point parent node left to removed node right and delete
						parentNode.left = nodeToRemove.right;
						nodeToRemove = null;
						return true;
					} else {
						//point parent node right to removed node right and delete
						parentNode.right = nodeToRemove.right;
						nodeToRemove = null;
						return true;
					}
					
				}
				//if the node to remove has both children
				if(nodeToRemove.right && nodeToRemove.left) {
					//get successor node
					let successor = this.findSuccessor(nodeToRemove);
					//save sucessor val
					let tempVal = successor.val;
					//remove successor node
					this.remove(tempVal);
					//copy successor val into node to remove
					nodeToRemove.val = tempVal;
					return true;
				}

			} else {
				//removing the root
				//if the tree only has root
				if(!nodeToRemove.left && !nodeToRemove.right) {
					//just delete root
					this.root = null;
					return true;
				}
				//if the node only has left
				if(nodeToRemove.left && !nodeToRemove.right) {
					//set the root to the node left and delete old root
					this.root = nodeToRemove.left;
					nodeToRemove = null;
					return true;
				}
				//if the node only has right
				if(!nodeToRemove.left && nodeToRemove.right) {
					//set the root to the node left and delete old root
					this.root = nodeToRemove.right;
					nodeToRemove = null;
					return true;
				}
				//if node has both children
				if(nodeToRemove.left && nodeToRemove.right) {
					//get successor node
					let successor = this.findSuccessor(nodeToRemove);
					//save sucessor val
					let tempVal = successor.val;
					//remove successor node
					this.remove(tempVal);
					//copy successor val into node to remove
					nodeToRemove.val = tempVal;
					return true;
				}
			}
		} else {
			return false;
		}
	}
	find(val) {
		// if the tree is empty return false
		if(this.root === null) { return false }
		let current = this.root;
		let found = false;
		while(current && !found) {
			// if the current val is found break out
			if(val === current.val) {
				found = true;
			}
			//if less than go left
			if(val < current.val) {
				current = current.left;
				continue; //return to top
			}
			if(val > current.val) {
				//if greater than go right
				current = current.right;
			}
		}
		if(!found) { return false };
		return current;
	}
	findParent(val) {
		//if the tree is empty return false
		if(this.root === null) { return false };
		//if the tree is the root return false
		if(val === this.root.val) { return false };
		let current = this.root;
		let parent = this.root;
		let found = false;
		//if the tree actually contains the value
		if(this.find(val)) {
			//loop until the value is found;
			while(current && !found) {
				if(val === current.val) {
					//break out if the value is found
					//parent will be the previous node here
					found = true;
				}
				if(val < current.val) {
					// less than go left and update the parent
					parent = current;
					current = current.left;
					continue; //return to top
				}
				if(val > current.val){
					// greater than go right and update the parent
					parent = current;
					current = current.right;
				}
			}

		} else  {
			//otherwise return false
			return false;
		}
		if(!found) { return false }
		return parent;
	}
	//finds the successor node of a node that has 2 children
	findSuccessor(nodeIn) {
		let rightSubRoot = nodeIn.right;
		let minNode = this.findMinNode(rightSubRoot);
		return minNode;
	}
	//find node child with no left subtree
	findMinNode(nodeIn) {
		let current = nodeIn;
		if (current.left) {
			while(current.left) {
				current = current.left
			}
		}
		return current;
	}
	BFSiterative() {
		//set current as root and push it into the queue
		let current = this.root;
		let data = [];
		let queue = new Queue();
		queue.enqueue(current);
		//while there are still nodes in the queue
		while(queue.length) {
			//update current
			current = queue.dequeue();
			//push current value into data
			data.push(current.val);
			//see if there are left or right nodes and push into queue 
			if(current.left) { queue.enqueue(current.left) };
			if(current.right) { queue.enqueue(current.right) };
		}
		return data;
	}
	BFSrecursive() {
		//initialize a data variable and a queue with the root
		let data = [];
		let queue = new Queue();
		queue.enqueue(this.root);
		function traverse() {
			//until the queue is empty
			if(!queue.length) { return; }
			//dequeue the next node, save the val, and enqueue any children
			let current = queue.dequeue();
			data.push(current.val);
			if(current.left) { queue.enqueue(current.left) };
			if(current.right) { queue.enqueue(current.right) };
			traverse();
		}
		traverse();
		return data;
	}
	DFSpreorder() {
		//make a data variable to hold the results
		let data = [];
		//push the data then traverse the tree left, then right 
		function traverse(node) {
			data.push(node.val);
			if(node.left) { traverse(node.left) };
			if(node.right) { traverse(node.right) };
		}
		traverse(this.root);
	    return data;
	}
	DFSinorder() {
		//make a data variable to hold the results
		let data = [];
		//traverse the tree left, push data, then right
		function traverse(node) {
			if(node.left) { traverse(node.left) };
			data.push(node.val);
			if(node.right) { traverse(node.right) };
		}
		traverse(this.root);
	    return data;
	}
	DFSpostorder() {
		//make a data variable to hold the results
		let data = [];
		//traverse the tree left, right, then push data
		function traverse(node) {
			if(node.left) { traverse(node.left) };
			if(node.right) { traverse(node.right) };
			data.push(node.val);
		}
		traverse(this.root);
	    return data;
	}

}

//Queue class for BFS queue:
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



let tree = new BinarySearchTree();

tree.insert(10);
tree.insert(14);
tree.insert(8);
tree.insert(6);
tree.insert(7);
tree.insert(1);
tree.insert(2);
tree.insert(12);
tree.insert(13);
tree.insert(17);
tree.insert(11);

tree.BFSiterative();
tree.BFSrecursive();
//[10, 8, 14, 6, 12, 17, 1, 7, 11, 13, 2]
tree.DFSpreorder();
//[10, 8, 6, 1, 2, 7, 14, 12, 11, 13, 17]
tree.DFSinorder();
//[1, 2, 6, 7, 8, 10, 11, 12, 13, 14, 17]
tree.DFSpostorder();
//[2, 1, 7, 6, 8, 11, 13, 12, 17, 14, 10]
