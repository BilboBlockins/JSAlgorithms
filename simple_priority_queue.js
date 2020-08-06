
//SIMPLE PRIORITY QUEUE:
//for use with graph (like shortest path) algorithms
//better to implement a heap priority queue for better performance

class PriorityQueue{
	constructor(){
		this.values = [];
	}

	insert(value, priority){
		this.values.push({value,priority});
		this.sort();
	}
	extract(){
		return this.values.shift();
	}
	sort(){
		this.values.sort((a,b) => a.priority - b.priority); //this sort every time O(n*logn) should change
	}
}


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
		while(this.adjList[vertex].length){
			const adjVertex = this.adjList[vertex].pop(); // only for 2 way
			this.removeEdge(vertex, adjVertex);
		}
		delete this.adjList[vertex];
	}

	addEdge(v1,v2, weight){
		if(this.adjList[v1] && this.adjList[v2])
		{
			this.adjList[v1].push({vertex:v2, weight});
			this.adjList[v2].push({vertex:v1, weight});
		}
		else
			console.log("error adding edge");
	}

	removeEdge(v1,v2){
		if(this.adjList[v1] && this.adjList[v2])
		{
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

				if(!adjList[vertex]) //!vertex?
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

		while(stack.length) // we are done when we hit 0
		{
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

		visited[vertexIn] = true; //mark fist item as visited

		while(queue.length) // we are done when we hit 0
		{
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

