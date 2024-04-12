class Graph {
  constructor() {
    this.noOfNodes = 0;
    this.adjacencyList = {};
  }

  addVertex(node) {
    this.adjacencyList[node] = [];
    this.noOfNodes++;
  }

  addEdge(node1, node2) {
    this.adjacencyList[node1].push(node2);
    this.adjacencyList[node2].push(node1);
  }

  showConnections() {
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} ---> ${this.adjacencyList[vertex]}`);
    }
  }
}

const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);

graph.addEdge(3, 1);
graph.addEdge(5, 1);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(2, 3);

console.log(graph.showConnections());
