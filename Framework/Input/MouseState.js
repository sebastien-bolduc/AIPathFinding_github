/**
 * Constructor which set the default value of the mouse state.
 * @param (no arguments)
 * @class
 * Represents the state of a mouse input device, including mouse cursor position
 * and buttons pressed.
 */
function MouseState()
{
    this.X = 0;
    this.Y = 0;
     
    this.Button = false;
}
 
/**
 * Set the position on the X axis of the mouse.
 * @param e Event related to the mouse
 * @param canvasHandle Canvas object on which the mouse is operating
 * @return (nothing)
 */
MouseState.prototype.setX = function(e, canvasHandle)
{
    this.X = e.pageX;
    
    var obj = canvasHandle;
    if (obj.offsetParent) {
        do
        {
            this.X -= obj.offsetLeft;
        } while (obj = obj.offsetParent);
    }
    
    //this.X -= canvasHandle.offsetLeft;
};
 
/**
 * Get the position on the X axis of the mouse.
 * @param (no arguments)
 * @return {integer} Position on X axis
 */
MouseState.prototype.getX = function()
{
    return this.X;
};
 
/**
 * Set the position on the Y axis of the mouse.
 * @param e Event related to the mouse
 * @param canvasHandle Canvas object on which the mouse is operating
 * @return (nothing)
 */
MouseState.prototype.setY = function(e, canvasHandle)
{
    this.Y = e.pageY;
    
    var obj = canvasHandle;
    if (obj.offsetParent) {
        do
        {
            this.Y -= obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    
    //this.Y -= canvasHandle.offsetTop;
};
 
/**
 * Get the position on the Y axis of the mouse.
 * @param (no arguments)
 * @return {integer} Position on Y axis
 */
MouseState.prototype.getY = function()
{
    return this.Y;
};
 
/**
 * Set the button to "pressed" or not.
 * @param {boolean} pressed Mark the buton as "pressed" of not
 * @return (nothing)
 */
MouseState.prototype.setButton = function(pressed)
{
    this.Button = pressed;
};
 
/**
 * Check to see if the button is "pressed" or not. 
 * @param (no arguments)
 * @return {boolean} Button "pressed" or not
 */
MouseState.prototype.getButton = function()
{
    var pressed = this.Button;
    this.Button = false;
     
    return pressed;
};