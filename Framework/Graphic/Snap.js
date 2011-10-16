/**
 * Constructor that set the snap width and height.
 * @param width width of the snap
 * @param height Height of the snap
 * @class
 * Create a snap object to which we can tell if it clonable or not (meaning if
 * one or multiple snap can be present on the grid).
 */
function Snap(width, height)
{
    this.snapWidth = width;
    this.snapHeight= height;
     
    this.clone = true;
}
 
/**
 * Check to see if the snap is clonable or not.
 * @param (no arguments)
 * @return {boolean} Snap clonable or not
 */
Snap.prototype.getClone = function()
{
    return this.clone;
};
 
/**
 * Draw the snap on the grid.
 * @param {CanvasContext} bufferContext Canvas context to which we draw
 * @param x Coordinate on X axis
 * @param y Coordinate on Y axis
 * @return (nothing)
 */
Snap.prototype.draw = function(bufferContext, x, y)
{
    var radius = (this.snapWidth/2) - (this.snapWidth/10);
    bufferContext.beginPath();
    bufferContext.arc(x, y, radius, 0, Math.PI*2, false);
    bufferContext.closePath();
    bufferContext.strokeStyle = "#000000";
    bufferContext.stroke();
    bufferContext.fillStyle = "#000000";
    bufferContext.fill();
};