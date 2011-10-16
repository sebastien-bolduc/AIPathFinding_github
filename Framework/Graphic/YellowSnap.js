/**
 * Constructor that set the snap width and height.
 * @param width width of the snap
 * @param height Height of the snap
 * @class
 * Create a snap object to which we can tell if it clonable or not (meaning if
 * one or multiple snap can be present on the grid).
 */
function YellowSnap(width, height)
{
    // call constructor of super class
    Snap.call(this, width, height);
     
    this.clone = false;
}
 
// inherits from Snap
extend(Snap, YellowSnap);
 
/**
 * Draw the snap on the grid.
 * @param {CanvasContext} bufferContext Canvas context to which we draw
 * @param x Coordinate on X axis
 * @param y Coordinate on Y axis
 * @return (nothing)
 */
YellowSnap.prototype.draw = function(bufferContext, x, y)
{
    var radius = (this.snapWidth/2) - (this.snapWidth/10);
    bufferContext.beginPath();
    bufferContext.arc(x, y, radius, 0, Math.PI*2, false);
    bufferContext.closePath();
    bufferContext.strokeStyle = "#000000";
    bufferContext.stroke();
    bufferContext.fillStyle = "#FFFF00";
    bufferContext.fill();
};