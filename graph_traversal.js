//GRAPH TRAVERSALS

//USES
//Peer to peer network graph
//Web crawlers
//Finding closest matches/recommendations
//Shortest path problems
	//-Gps Navigation
	//-Sovling mazes
	//-Shortest path to win a game

//DFS - Depth First Search - Explore as far down as possible before going back to neighbor

//BFS - Breadth First Search - Explore sideways as far as possible before going down

//PSEUDOCODE
//DFS Recursively
	//create an empty list that stores the end result node
	//create an object to store the visted items
	//if vertex is empty - return
	//add vertex to the results list 
	//mark vertex as visited
	//for each neighbor in the vertex's neighbors
	//if neighbor is not visited
	//recursively call dfs on neighbor - the call stack order ensures that one entire branch is visited first

//PSEUDOCODE
//DFS Iteratively
	//create a list for the results
	//create an object to store vertices visited
	//add starting vertex to the stack and mark it as visited
	//while the stack is not empty
		// remove a vertex from the end
		//if vertex is not labeled as visited:
			//add to result list
			//label vertex as visited
			//for each of vertex's neighbors, push the neighbor in the stack

//BFS:
//Searches all the neighbor nodes first before going down a level
//Instead of using a stack to keep track of what we need to search,
//use a queue (can use an array with push and unshift)


class Graph {
	constructor(){
		this.adjList={};
	}

	addVertex(vertex){
		if(!this.adjList[vertex])
			this.adjList[vertex] = [];
		else
			console.log("vertex exists")
	}

	removeVertex(vertex)
	{
		while(this.adjList[vertex].length) {
			const adjVertex = this.adjList[vertex].pop();
			this.removeEdge(vertex, adjVertex);
		}
		delete this.adjList[vertex];
	}

	addEdge(v1,v2){
		if(this.adjList[v1] && this.adjList[v2]) {
			this.adjList[v1].push(v2);
			this.adjList[v2].push(v1);
		}
		else
			console.log("error adding edge");
	}

	removeEdge(v1,v2){
		if(this.adjList[v1] && this.adjList[v2]) {
			this.adjList[v1] = this.adjList[v1].filter(entry => entry !== v2);
			this.adjList[v2] = this.adjList[v2].filter(entry => entry !== v1);
		}
		else
			console.log("error removing edge");
	}

	dfsTraversalR(vertexIn){
		const results = [];
		const visited = {};
		const adjList = this.adjList;
		function _dfsHelperR(vertex){

				if(!adjList[vertex])
					return null;
				else
				{
					results.push(vertex);
					visited[vertex]= true;
					adjList[vertex].forEach(edge => {
						if(!visited[edge])
							return _dfsHelperR(edge);
					});
					
				}

		}

		_dfsHelperR(vertexIn);

		return results;
	}

	dfsTraversalI(vertexIn){
		const results = [];
		const visited = {};
		const stack = [vertexIn];
		let currentVert;

		visited[vertexIn] = true;

		while(stack.length) { // we are done when we hit 0
			currentVert = stack.pop();
			results.push(currentVert);

			this.adjList[currentVert].forEach(edge => {
				if(!visited[edge])
				{
					visited[edge]=true;
					stack.push(edge);
				}
			});
		}

		return results;
	}

	bfsTraversalI(vertexIn){
		const results = [];
		const visited = {};
		const queue = [vertexIn];
		let currentVert;

		visited[vertexIn] = true; //mark first item as visited

		while(queue.length) { // we are done when we hit 0
			currentVert = queue.shift(); //take out the first item (as opposed to pop off the end)
			results.push(currentVert);

			this.adjList[currentVert].forEach(edge => {
				if(!visited[edge])
				{
					visited[edge]=true;
					queue.push(edge);
				}
			});
		}

		return results;
	}
	
}

g = new Graph();

g.addVertex("A");

g.addVertex("B");

g.addVertex("C");

g.addVertex("D");

g.addEdge("D", "A");

g.addEdge("B", "A");

g.addEdge("C", "B");