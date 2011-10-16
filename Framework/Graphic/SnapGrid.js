/**
 * Constructor which position the grid on the screen.
 * @param offsetX Position of the grid from left
 * @param offsetY Position of the grid from top
 * @class
 * Class taking care of creating and initializing our SnapGrid, setting the
 * default value and use of the grid.
 */
function SnapGrid(offsetX, offsetY)
{
    // set default value for the grid
    this.gridOffsetX = offsetX;
    this.gridOffsetY = offsetY;
    this.gridWidth = 9;
    this.gridHeight= 9;
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

/**
 * Reset the grid.
 * @param (no arguments)
 * @return (nothing)
 */
 SnapGrid.prototype.resetGrid = function()
 {
     // reset grid array
    this.grid = new Array(this.gridWidth * this.gridHeight);
    for(var i = 0; i < this.grid.length; i++)
    {
        this.grid[i] = 0;
    }
 };

/**
 * Return the grid width.
 * @param (no arguments)
 * @return {number} Width of the grid
 */
SnapGrid.prototype.getGridWidth = function()
{
    return this.gridWidth;
};

/**
 * Return the snap width to use on the grid.
 * @param (no arguments)
 * @return {number} Width of the snap to use
 */
SnapGrid.prototype.getSnapWidth = function()
{
    return this.snapWidth;
};
 
/**
 * Return the snap height to use on the grid.
 * @param (no arguments)
 * @return {number} Height of the snap to use
 */
SnapGrid.prototype.getSnapHeight = function()
{
    return this.snapHeight;
};
 
/**
 * Convert Axis coordinate (pixel) to cell coordinate.
 * @param x Coordinate on X axis
 * @param y Coordinate on Y axis
 * @return {Array} The converted coordinate
 */
SnapGrid.prototype.convertToCellCoordinate = function(x, y)
{
    var i = Math.floor(x / this.snapWidth);
    var j = Math.floor(y / this.snapHeight);
     
    return [i, j];
};
 
/**
 * Check if we click on the grid.
 * @param i Coordinate on I axis
 * @param j Coordinate on J axis
 * @return {boolean} In bound or out of bound
 */
SnapGrid.prototype.checkingIfOutOfBound = function(i, j)
{
    if (i < 0 || i >= this.gridWidth)
        return true;
    else if (j < 0 || j >= this.gridHeight)
        return true;
    else
        return false;
};
 
/**
 * Put a snap on the grid.
 * @param x Coordinate on X axis
 * @param y Coordinate on Y axis
 * @param {Snap} snap Snap object to use on the grid
 * @return (nothing)
 */
SnapGrid.prototype.snapOn = function(x, y, snap)
{   
    var cell = this.convertToCellCoordinate((x - this.gridOffsetX), (y - this.gridOffsetY));
    var i = cell[0];
    var j = cell[1];
    
    if (this.checkingIfOutOfBound(i, j))
        return;
     
    if (this.grid[j * this.gridWidth + i] !== 0)
        this.snapOff(i, j);
    else
    {
        // is the snap clonable or not?
        if (!snap.getClone())
            this.retrieveAndRemoveSnap(snap);

        this.grid[j * this.gridWidth + i] = snap;
    }
};

/**
 * Put a snap on the grid.
 * @param cell Cell to snap to
 * @param {Snap} snap Snap object to use on the grid
 * @return (nothing)
 */
SnapGrid.prototype.snapOnCell = function(cell, snap)
{   
    this.grid[cell] = snap;
};

/**
 * Put a snap on the grid (if empty).
 * @param i Coordinate on I axis
 * @param j Coordinate on J axis
 * @param {Snap} snap Snap object to use on the grid
 * @return (boolean) Was the snap successful or not
 */
SnapGrid.prototype.snapOnEmpty = function(i, j, snap)
{   
    if (this.checkingIfOutOfBound(i, j))
        return false;
     
    if (this.grid[j * this.gridWidth + i] !== 0)
        return false
    else
        this.grid[j * this.gridWidth + i] = snap;
    
    return true
};
 
/**
 * Get a snap off the grid.
 * @param i Coordinate on I axis
 * @param j Coordinate on J axis
 * @return (nothing)
 */
SnapGrid.prototype.snapOff = function(i, j)
{
    this.grid[j * this.gridWidth + i] = 0;
};
 
/**
 * Retrieve a snap on the grid and remove it if one is present.
 * @param {Snap} snap Snap object to retrieve and remove
 * @return (nothing)
 */
SnapGrid.prototype.retrieveAndRemoveSnap = function(snap)
{
    for(var i = 0; i < this.grid.length; i++)
    {
        // we check memory location for object identity (if the object are at
        // the same location in the memory, they're the same object)
        if (this.grid[i] === snap)
        {
            this.grid[i] = 0;
            break;
        }
    }
};

/**
 * Retrieve the active cell with the snap on.
 * @param {Snap} snap Snap object to retrieve
 * @return {number} Acitve cell
 */
SnapGrid.prototype.getActiveCell = function(snap)
{
    for(var i = 0; i < this.grid.length; i++)
    {
        // we check memory location for object identity (if the object are at
        // the same location in the memory, they're the same object)
        if (this.grid[i] === snap)
        {
            return i;
        }
    }
};
 
/**
 * Draw our grid and the snap on it.
 * @param {CanvasContext} bufferContext Canvas context to which we draw
 * @return (nothing)
 */
SnapGrid.prototype.draw = function(bufferContext)
{
    bufferContext.beginPath();
    
    // vertical lines
    for (var x = (0 + this.gridOffsetX); x <= this.pixelWidth; x += this.snapWidth) {
        bufferContext.moveTo(0.5 + x, this.gridOffsetY);
        bufferContext.lineTo(0.5 + x, this.pixelHeight);
    }
    
    // horizontal lines
    for (var y = (0 + this.gridOffsetY); y <= this.pixelHeight; y += this.snapHeight) {
	    bufferContext.moveTo(this.gridOffsetX, 0.5 + y);
	    bufferContext.lineTo(this.pixelWidth, 0.5 +  y);
    }
    
    bufferContext.closePath();
    
    // draw it!
    bufferContext.strokeStyle = "#ccc";
    bufferContext.stroke();
     
    // draw snap
    for(var i = 0; i < this.grid.length; i++)
    {
        if (this.grid[i] !== 0)
        {
            x = ((i % this.gridWidth) * this.snapWidth) + (this.snapWidth/2) + this.gridOffsetX;
            y = (Math.floor(i / this.gridWidth) * this.snapHeight) + (this.snapHeight/2) + this.gridOffsetY;
            this.grid[i].draw(bufferContext, x, y); 
        }
    }
};