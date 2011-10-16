// some constant for handling the keyboard keys
var Keys = {};
Keys.PageUp = 33;   // Page Up key
Keys.PageDown = 34; // Page Down key
Keys.Home = 36;    	// Home key
Keys.Left = 37;     // Left cursor key
Keys.Up = 38;       // Up cursor key
Keys.Right = 39;    // Right cursor key
Keys.Down = 40;     // Down cursor key
Keys.b = 66;        // b key
Keys.f = 70;		// f key
Keys.g = 71;        // g key
Keys.r = 82;        // r key
Keys.s = 83;        // s key
Keys.w = 87;		// w key
Keys.y = 89;        // y key


/**
 * Constructor that set things up for keyboard input.
 * @param (no arguments)
 * @class
 * Allow retrieval of keystrokes from a keyboard input device.
 */
function Keyboard()
{
	this.isKeyPressed = [256];
	this.isKeyPressedOnce = [256];

	for (i = 0; i < 256; i++) {
		this.isKeyPressed[i] = false;
		this.isKeyPressedOnce[i] = false;
	}
        
        // register callback function for keyboard event
        var obj = this;
        document.onkeydown = function(event){obj.handleKeyDown(event);};
        document.onkeyup = function(event){obj.handleKeyUp(event);};    
}

/**
 * Put a key to true when stroke down.
 * @param event Event relating to keyboard strokes
 * @return (nothing)
 */
Keyboard.prototype.handleKeyDown = function(event)
{
	this.isKeyPressed[event.keyCode] = true;
};

/**
 * Put a key to false when release.
 * @param event Event relating to keyboard strokes.
 * @return (nothing)
 */
Keyboard.prototype.handleKeyUp = function(event)
{
	this.isKeyPressed[event.keyCode] = false;
};

/**
 * Check if a key is down.
 * @param key Char code of the key to check.
 * @return {boolean} Key pressed or not
 */
Keyboard.prototype.isKeyDown = function(key)
{
	return this.isKeyPressed[key];
};

/**
 * Check if a key is down only once.
 * @param key Char code of the key to check.
 * @return {boolean} Key pressed or not
 */
Keyboard.prototype.isKeyDownOnce = function(key)
{
	if (this.isKeyPressed[key] === true && this.isKeyPressedOnce[key] === false) {
		this.isKeyPressedOnce[key] = true;
		return true;
	}
	else if (this.isKeyPressed[key] === false && this.isKeyPressedOnce[key] === true) {
		this.isKeyPressedOnce[key] = false;
		return false;
	} 
	else {
		return false;
	}
};