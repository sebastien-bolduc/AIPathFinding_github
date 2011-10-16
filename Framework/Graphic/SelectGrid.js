/**
 * Constructor which position the grid on the screen.
 * @param offsetX Position of the grid from left
 * @param offsetY Position of the grid from top
 * @class
 * Class taking care of creating and initializing our SelectGrid, setting the
 * default value and use of the grid.
 */
function SelectGrid(width, height) {
    // call constructor of super class
    SnapGrid.call(this, width, height);
    
    this.gridWidth = 1;
    this.gridHeight= 3;
    this.snapWidth = 50;
    this.snapHeight= 50;
    this.pixelWidth = 1 + (this.gridWidth * this.snapWidth) + this.gridOffsetX;
    this.pixelHeight= 1 + (this.gridHeight * this.snapHeight) + this.gridOffsetY;
    
    // initialize grid array
    this.grid = new Array(this.gridWidth * this.gridHeight);
    for(var i = 0; i < this.grid.length; i++)
    {
        this.grid[i] = 0;
    }
}

// inherits from SnapGrid
extend(SnapGrid, SelectGrid);

/**
 * Put a snap on the grid.
 * @param x Coordinate on X axis
 * @param y Coordinate on Y axis
 * @param {Snap} snap Snap object to use on the grid
 * @return (nothing)
 */
SelectGrid.prototype.snapOn = function(x, y, snap)
{   
    var cell = this.convertToCellCoordinate((x - this.gridOffsetX), (y - this.gridOffsetY));
    var i = cell[0];
    var j = cell[1];
    
    if (this.checkingIfOutOfBound(i, j))
        return;
     
    // is the snap clonable or not?
    if (!snap.getClone())
        this.retrieveAndRemoveSnap(snap);

    this.grid[j * this.gridWidth + i] = snap;
};

/**
 * Put a snap on the grid.
 * @param i Coordinate on I axis
 * @param j Coordinate on J axis
 * @param {Snap} snap Snap object to use on the grid
 * @return (nothing)
 */
SelectGrid.prototype.snapOnCell = function(i, j, snap)
{   
    if (this.checkingIfOutOfBound(i, j))
        return;
     
    // is the snap clonable or not?
    if (!snap.getClone())
        this.retrieveAndRemoveSnap(snap);

    this.grid[j * this.gridWidth + i] = snap;
};

/**
 * Draw our grid and the snap on it.
 * @param {CanvasContext} bufferContext Canvas context to which we draw
 * @return (nothing)
 */
SelectGrid.prototype.draw = function(bufferContext)
{
    // call function from super class
    SnapGrid.prototype.draw.call(this, bufferContext);
    
    bufferContext.beginPath();
    bufferContext.fillStyle = "#000000";
    bufferContext.font = "bold 12px sans-serif";
    bufferContext.fillText("MOUSE", this.gridOffsetX + 75, this.gridOffsetY + 25);
    bufferContext.fillText("CHEESE", this.gridOffsetX + 75, this.gridOffsetY + 75);
    bufferContext.fillText("OBSTACLE", this.gridOffsetX + 75, this.gridOffsetY + 125);
    bufferContext.closePath();
};