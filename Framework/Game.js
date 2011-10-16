/**
 * Constructor on which our game object is base.
 * @param (no arguments)
 * @class
 * This class take care of creating and initializing everything that is
 * necassary for our game to run.
 */
function Game()
{
    this.canvas = null;                 // canvas element
    this.context = null;                // content element (for 2d drawing)
    this.canvasBuffer = null;           // use for double buffering
    this.canvasBufferContext = null;    // use for double buffering
    
    // game timing value
    this.gameTime = new GameTime();
}

/**
 * Allows the game to perform any initialization it needs to before starting to
 * run.  This is where it can query for any required services and load any
 * non-graphic related content.
 * @param (no arguments)
 * @return (nothing)
 */
Game.prototype.initialize = function()
{
    // TODO: Add your initialization logic here
    
    // prepare our buffer for the 'double buffering'
    this.canvasBuffer = document.createElement('canvas');
    this.canvasBuffer.width = this.canvas.width;
    this.canvasBuffer.height = this.canvas.height;
    this.canvasBufferContext = this.canvasBuffer.getContext('2d');
};

/**
 * loadContent will be called once per game and is the place to load
 * all of your content.
 * @param (no arguments)
 * @return (nothing)
 */
Game.prototype.loadContent = function()
{    
    // TODO: Use this.content to load your game content here
};

/**
 * unloadContent will be called once per game and is the place to unload
 * all content.
 * @param (no arguments)
 * @return (nothing)
 */
Game.prototype.unloadContent = function()
{
    // TODO: Unload any non ContentManager content here
};

/**
 * Allows the game to run logic such as updating the world, checking for
 * collisions, gathering input, and playing audio.
 * @param {GameTime} gameTime Provides a snapshot of timing values
 * @return (nothing)
 */
Game.prototype.update = function(gameTime)
{
    // TODO: Add your update logic here
    
    // update our game time
    gameTime.update();
};

/**
 * This is called when the game should draw itself.
 * @param {GameTime} gameTime Provides a snapshot of timing values
 * @return (nothing)
 */
Game.prototype.draw = function(gameTime)
{
    // TODO: Add your drawing code here
};

/**
 * Starting point of the game loop.
 * @param (no arguments)
 * @return (nothing)
 */
Game.prototype.run = function()
{
    this.initialize();
    this.loadContent();
    this.unloadContent();
    this.gameLoop();
};

/**
 * Game loop.
 * @param (no arguments)
 * @return (nothing)
 */
Game.prototype.gameLoop = function()
{
    // we call the "GameLoop" with "this" object
    var obj = this;
    requestAnimFrame(function(){obj.gameLoop();});
    
    this.update(this.gameTime);
    this.draw(this.gameTime);
};