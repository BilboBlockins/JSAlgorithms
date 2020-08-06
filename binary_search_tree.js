//Binary Trees

//Trees: A data structure that consists of a parent/child relationship starting from a root.
//Children never point to parents, children never point to siblings.
//Unlike lists, trees are nonlinear.
//A leaf is a node with no children.
//The browser dom is a tree with parent and children, OS folders are trees.
//For binary trees, a type of tree, each node only has 2 children.
//For binary search trees, BST, the inserted data is sorted. 
//All data in a BST that is greater than a node is pushed to the right child, and all data that is less than a node is pushed left.
//BST are used because they are fast for looking up data - far fewer comparisons than finding somthing in a list.

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
	// Prints inorder traversal of a tree 
	inorder(node) { 
	    if(node !== null) { 
	        this.inorder(node.left); 
	        console.log(node.val); 
	        this.inorder(node.right); 
	    } 
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
tree.remove(12);
tree.remove(10);
tree.inorder(tree.root);
//logs: 1 2 6 7 8 11 13 14 17

//Operation complexity of sorted binary search tree:
//Inserting: O(log n) - pretty solid - really just the tree level depth
//Searching: O(log n)

