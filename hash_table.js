//Hash Tables:
//Hash tables are used to store unordered key-value pairs

//Python has dictionary
//Js has objects or maps
//Java, Go, Scala, have maps
//Ruby has hashes

//Python exposes a hash function called hash("input"), that will allways return the same size number.
//doesn't go backward, you can't get the key back from the hash number.
//JS already has objects, so HashTable class is just for concepts

//What makes a good hash?
//	- needs to be fast (ie constant time becasue we need to hash on insert and when we find things)
//	- Doesn't cluster outputs at a specific indices, but distributes uniformly.
//	- Deterministic (same input yields same output).

//Handling Collisions
	//Separate Chaining
	//Linear Probing

//With separate chaining, at each index, we have a more sophisticated data structure (array or linked list);
//With linear probing, we move the index forward, (we try to store only 1 item in each index)

class HashTable {
	constructor(size=53){
		this.keyMap = new Array(size);
	}

	_hash(key){
		let total = 0;
		let WEIRD_PRIME = 31; // add a weird prime num
		for (let i=0; i< Math.min(key.length, 100); i++) // set a max for looking at the input data
		{
			let char = key[i];
			let value = char.charCodeAt(0) - 96;
			total = (total * WEIRD_PRIME + value) % this.keyMap.length; //less collisions if the arrayLen is a prime.
		}
		return Math.abs(total);
	}

	set(key, value){
		let index = this._hash(key);
		if(!this.keyMap[index]){
			this.keyMap[index] = []; //adding an array at the index
		} // need logic to prevent duplicate keys
		this.keyMap[index].push([key,value]); // push a new array with key and value into nested array
	}

	get(key){
		let index = this._hash(key);
		if(this.keyMap[index]){
			for(let i=0; i<this.keyMap[index].length; i++){
				if(this.keyMap[index][i][0] === key){
					return this.keyMap[index][i][1];
				}
			}
		}
		return undefined;
	}

	keys(){
		let keysArr = [];
		for(let i=0; i<this.keyMap.length; i++)
		{
			if(this.keyMap[i]){
				for(let j=0; j<this.keyMap[i].length; j++)
				{
					keysArr.push(this.keyMap[i][j][0]);
				}
			}
		}
		return keysArr;
	}

	values(){
		let valuesArr = [];
		for(let i=0; i<this.keyMap.length; i++)
		{
			if(this.keyMap[i]){
				for(let j=0; j<this.keyMap[i].length; j++)
				{
					valuesArr.push(this.keyMap[i][j][1]); //could also check for duplicates here.
				}
			}
		}
		return valuesArr;
	}
}

let ht = new HashTable();

ht.set("NewKey", "HelloWorld");
ht.set("Hellothere", "GeneralGrievas")
ht.set("Cats", "Dogs")
ht.set("Boobies", "Bootays")

//Hash table operations:
//insertion: O(1); awesome
//Deletion: O(1); awesome
//Access: O(1); awesome
//Searching for a Key: O(1) awesome
//Searching for a value: O(n) ok