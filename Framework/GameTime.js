/**
 * Constructor that create our GameTime object.
 * @param (no arguments)
 * @class
 * This class handle the timing values related to the game.
 */
function GameTime()
{
    this.elapsed = null;    // time elapsed since last call (in millisecond)
    this.lastTime = null;   // last time saved
}

/**
 * Calculate the time elapsed since the last call.
 * @param (no arguments)
 * @return (nothing)
 */
GameTime.prototype.update = function()
{
    var timeNow = new Date().getTime();
    
    if (this.lastTime !== 0) {
        this.elapsed = timeNow - this.lastTime;
    }
    
    this.lastTime = timeNow;
};

/**
 * Get the time elapsed since the last update.
 * @param (no arguments)
 * @return {integer} Time elapsed in millisecond.
 */
GameTime.prototype.getTimeElapsed = function()
{
    return this.elapsed;
};