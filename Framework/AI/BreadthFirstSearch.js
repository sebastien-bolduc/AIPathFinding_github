/**
 * Constructor description
 * @param option The first argument
 * @class
 * Class description
 */
function BreadthFirstSearch(board) 
{
    this.board = board;
    this.mark = new MarkerSnap(this.board.getSnapWidth(), this.board.getSnapHeight());
    this.pathSN = new PathSnap(this.board.getSnapWidth(), this.board.getSnapHeight());
    
    this.queue = [];
    this.scoreBoard = new Array(this.board.length);
}

/**
 * Method description
 * @param {Array} list The first argument
 * @return {boolean} The result
 */
BreadthFirstSearch.prototype.resetScoreBoard = function()
{
    this.scoreBoard = new Array(this.board.length);
};

/**
 * Method description
 * @param {Array} list The first argument
 * @return {boolean} The result
 */
BreadthFirstSearch.prototype.findNeighbor = function(currentNode, endNode, score) 
{
    var j = Math.floor(currentNode / this.board.getGridWidth());
    var i = currentNode - (j * this.board.getGridWidth());
    
    // left neighbor
    if (this.board.snapOnEmpty((i - 1), j, this.mark))
    {
        this.queue.push((i - 1) + (j * this.board.getGridWidth()));
        this.scoreBoard[(i - 1) + (j * this.board.getGridWidth())] = score;
    }
        
    // right neighbor
    if (this.board.snapOnEmpty((i + 1), j, this.mark))
    {
        this.queue.push((i + 1) + (j * this.board.getGridWidth()));
        this.scoreBoard[(i + 1) + (j * this.board.getGridWidth())] = score;
    }
        
    // top neighbor
    if (this.board.snapOnEmpty(i, (j - 1), this.mark))
    {
        this.queue.push(i + ((j - 1) * this.board.getGridWidth()));
        this.scoreBoard[i + ((j - 1) * this.board.getGridWidth())] = score;
    }
        
    // bottom neighbor
    if (this.board.snapOnEmpty(i, (j + 1), this.mark))
    {
        this.queue.push(i + ((j + 1) * this.board.getGridWidth()));
        this.scoreBoard[i + ((j + 1) * this.board.getGridWidth())] = score;
    }
        
    // check for end node
    // left neighbor
    if (this.board.getActiveCell(endNode) == (currentNode - 1) && !this.board.checkingIfOutOfBound(i - 1, j))
    {
        this.queue.push(currentNode - 1);
        this.scoreBoard[currentNode - 1] = score + 1;
    }
    // right neighbor
    if (this.board.getActiveCell(endNode) == (currentNode + 1) && !this.board.checkingIfOutOfBound(i + 1, j))
    {
        this.queue.push(currentNode + 1);
        this.scoreBoard[currentNode + 1] = score + 1;
    }
    // top neighbor
    if (this.board.getActiveCell(endNode) == (currentNode - this.board.getGridWidth()) && !this.board.checkingIfOutOfBound(i, j - 1))
    {
        this.queue.push(currentNode - this.board.getGridWidth());
        this.scoreBoard[currentNode - this.board.getGridWidth()] = score + 1;
    }
    // bottom neighbor
    if (this.board.getActiveCell(endNode) == (currentNode + this.board.getGridWidth()) && !this.board.checkingIfOutOfBound(i, j + 1))
    {
        this.queue.push(currentNode + this.board.getGridWidth());
        this.scoreBoard[currentNode + this.board.getGridWidth()] = score + 1;
    }
};

/**
 * Method description
 * @param {Array} list The first argument
 * @return {boolean} The result
 */
BreadthFirstSearch.prototype.isGoal = function(currentNode, endNode)
{
    return (currentNode == this.board.getActiveCell(endNode)) ? true: false;
};

/**
 * Method description
 * @param {Array} list The first argument
 * @return {boolean} The result
 */
BreadthFirstSearch.prototype.findPath = function(currentNode)
{
    var j = Math.floor(currentNode / this.board.getGridWidth());
    var i = currentNode - (j * this.board.getGridWidth());
    
    var smallestNode = currentNode;
    
    // check for goal
    if (this.scoreBoard[currentNode] === 0)
        return true;
    
    do
    {
        // mark node as visited
        this.scoreBoard[smallestNode] = this.scoreBoard[currentNode];
        
        // left neighbor
        if (!this.board.checkingIfOutOfBound(i - 1, j))
            smallestNode = (this.scoreBoard[currentNode - 1] < this.scoreBoard[smallestNode]) ? (currentNode - 1) : smallestNode;
    
        // right neighbor
        if (!this.board.checkingIfOutOfBound(i + 1, j))
            smallestNode = (this.scoreBoard[currentNode + 1] < this.scoreBoard[smallestNode]) ? (currentNode + 1) : smallestNode;
    
        // top neighbor
        if (!this.board.checkingIfOutOfBound(i, j - 1))
            smallestNode = (this.scoreBoard[currentNode - this.board.getGridWidth()] < this.scoreBoard[smallestNode]) ? (currentNode - this.board.getGridWidth()) : smallestNode;
    
        // bottom neighbor
        if (!this.board.checkingIfOutOfBound(i, j + 1))
            smallestNode = (this.scoreBoard[currentNode + this.board.getGridWidth()] < this.scoreBoard[smallestNode]) ? (currentNode + this.board.getGridWidth()) : smallestNode;
        
        // mark path
        if (this.findPath(smallestNode))
        {
            if (this.scoreBoard[smallestNode] !== 0)
                this.board.snapOnCell(smallestNode, this.pathSN);
            return true;
        }
    } while(this.scoreBoard[smallestNode] < this.scoreBoard[currentNode]);
    
    // no more node
    return false;
};

/**
 * Method description
 * @param {Array} list The first argument
 * @return {boolean} The result
 */
 BreadthFirstSearch.prototype.searchPath = function(startingNode, endNode)
 {
     var currentNode = null;
     
     // create an empty queue
     this.queue = [];
     
     // add start node to queue and mark it 
     this.queue.push(this.board.getActiveCell(startingNode));
     this.scoreBoard[this.board.getActiveCell(startingNode)] = 0;
     
     // while queue is not empty 
     while (this.queue.length !== 0)
     {
         // pull node from queue
         currentNode = this.queue.pop();
         
         // if node is the goal
         if (this.isGoal(currentNode, endNode))
         {
             // empty the queue, we are done! 
             this.queue = [];
             
             // mark path
             this.findPath(currentNode);
         }
         else
         {
              // if neighbor is empty, add neighbor to queue
              this.findNeighbor(currentNode, endNode, this.scoreBoard[currentNode] + 1);
         }
     }
 };