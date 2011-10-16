/**
 * Constructor which initialize the mouse and add an 'EventListener' on the
 * canvas object.
 * @param canvasHandle Canvas object on which the mouse will operate.
 * @class
 * Allows retrieval of position and button clicks from a mouse input device.
 */
function Mouse(canvasHandle)
{
    this.canvasHandle = canvasHandle;
    this.mouseState = new MouseState();
     
    // we wish to use the present object in the 'EventListener' (we cannot use
    // 'this' since it will point to the canvas object)
    obj = this;
    this.canvasHandle.addEventListener("click",
                                        function(e) {
                                            obj.setState(e, obj);
                                        }, 
                                        false);
}
 
/**
 * Set the state of the mouse when call.
 * @param e Event the function is call for
 * @param obj Object which handle the call
 * @return (nothing)
 */
Mouse.prototype.setState = function(e, obj)
{
    obj.mouseState.setX(e, obj.canvasHandle);
    obj.mouseState.setY(e, obj.canvasHandle);
    obj.mouseState.setButton(true);
};
 
/**
 * Retrieve the state of the mouse.
 * @param (no arguments)
 * @return {MouseState} The state of the mouse
 */
Mouse.prototype.getState = function()
{
    return this.mouseState;
};