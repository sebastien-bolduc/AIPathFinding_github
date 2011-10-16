/**
 * Constructor on which our game object is base (this one can be modified).
 * This is the main type for your game.
 * @param (no arguments)
 * @class
 * This class take care of creating and initializing everything that is
 * necassary for our game to run.
 */
function Game1()
{
    // call constructor of super class
    Game.call(this);
    
    // get our canvas element
    this.canvas = document.getElementById("game-canvas");
	
	// get our context for 2d drawing
	this.context = this.canvas.getContext("2d");
    
    // variable for keyboard input
    this.keyboard = null;
    
    // variable for mouse input
    this.mouse = null;
    this.ms = null;
    
    // variable for SnapGrid
    this.sg = null;
    this.blackSN = null;
    this.yellowSN = null;
    this.greySN = null;
    this.activeSnap = null;
    
    // variable for SelectGrid
    this.selectGrid = null;
    this.selectSnap = null;
    
    // variable for AI
    this.aiPathSearch = null;
    this.aiSnap = null;
}

// inherits from Game
extend(Game, Game1);

// test
var searchButton = false;
var resetButton = false;

/**
 * Allows the game to perform any initialization it needs to before starting to
 * run.  This is where it can query for any required services and load any
 * non-graphic related content.
 * @param (no arguments)
 * @return (nothing)
 */
Game1.prototype.initialize = function()
{
	// TODO: Add your initialization logic here
    
    // initialize our keyboard
    this.keyboard = new Keyboard();
    
    // initialize our mouse
	this.mouse = new Mouse(this.canvas);
    this.ms = this.mouse.getState();
    
    // initialize our SnapGrid
    this.sg = new SnapGrid(50, 25);
    this.blackSN = new Snap(this.sg.getSnapWidth(), this.sg.getSnapHeight());
    this.yellowSN = new YellowSnap(this.sg.getSnapWidth(), this.sg.getSnapHeight());
    this.greySN = new GreySnap(this.sg.getSnapWidth(), this.sg.getSnapHeight());
    this.activeSnap = this.blackSN;
    
    // initialize our SelectGrid
    this.selectGrid = new SelectGrid(600, 25);
    this.selectSnap = new SelectSnap(this.selectGrid.getSnapWidth(), this.selectGrid.getSnapHeight());
    this.selectGrid.snapOnCell(0, 2, this.selectSnap);
    
    // initialize AI
    this.aiPathSearch = new BreadthFirstSearch(this.sg);
    this.aiSnap = new MarkerSnap(this.sg.getSnapWidth(), this.sg.getSnapHeight());
    
	// call function from super class
	Game.prototype.initialize.call(this);
};

/**
 * loadContent will be called once per game and is the place to load
 * all of your content.
 * @param (no arguments)
 * @return (nothing)
 */
Game1.prototype.loadContent = function()
{	
	// TODO: use this.Content to load your game content here
	
	// call function from super class
	Game.prototype.loadContent.call(this);
};

/**
 * unloadContent will be called once per game and is the place to unload
 * all content.
 * @param (no arguments)
 * @return (nothing)
 */
Game1.prototype.unloadContent = function()
{
	// TODO: Unload any non ContentManager content here
	
	// call function from super class
	Game.prototype.unloadContent.call(this);
};

/**
 * Allows the game to run logic such as updating the world, checking for
 * collisions, gathering input, and playing audio.
 * @param {GameTime} gameTime Provides a snapshot of timing values
 * @return (nothing)
 */
Game1.prototype.update = function(gameTime)
{
	// TODO: Add your update logic here
    if (this.keyboard.isKeyDownOnce(Keys.y))
        this.selectGrid.snapOnCell(0, 1, this.selectSnap);
    else if (this.keyboard.isKeyDownOnce(Keys.g))
        this.selectGrid.snapOnCell(0, 0, this.selectSnap);
    else if (this.keyboard.isKeyDownOnce(Keys.b))
        this.selectGrid.snapOnCell(0, 2, this.selectSnap);
    else if (this.keyboard.isKeyDownOnce(Keys.s) || searchButton)
    {
        searchButton = false;
        this.aiPathSearch.searchPath(this.greySN, this.yellowSN);
    }
    else if (this.keyboard.isKeyDownOnce(Keys.r) || resetButton)
    {
        resetButton = false;
        this.sg.resetGrid();
        this.aiPathSearch.resetScoreBoard();
    }
        
    // check for active snap
    switch(this.selectGrid.getActiveCell(this.selectSnap))
    {
        case 0:
            this.activeSnap = this.greySN;
            break;
        case 1:
            this.activeSnap = this.yellowSN;
            break;
        default:
            this.activeSnap = this.blackSN;
    }
    
    // get last state of the mouse
    this.ms = this.mouse.getState();
    
    // check for mouse button press
    if (this.ms.getButton())
    {
        this.sg.snapOn(this.ms.getX(), this.ms.getY(), this.activeSnap);
        this.selectGrid.snapOn(this.ms.getX(), this.ms.getY(), this.selectSnap);
    }
    
	// call function from super class
	Game.prototype.update.call(this, gameTime);
};

// temporary variable for frame rate
Game1.prototype._frameCounter = 0;
Game1.prototype._startTime = new Date().getTime();

/**
 * This is called when the game should draw itself.
 * @param {GameTime} gameTime Provides a snapshot of timing values
 * @return (nothing)
 */
Game1.prototype.draw = function(gameTime)
{
	// TODO: Add your drawing code here
	
	// clear screen, line, etc...
    this.canvasBufferContext.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
	this.canvasBufferContext.beginPath();
	
	// draw lines...
	/* this.canvasBufferContext.fillStyle = "#000";	
	this.canvasBufferContext.fillRect(this.ms.getX(), this.ms.getY(), 40, 40);
    */
    this.sg.draw(this.canvasBufferContext);
    this.selectGrid.draw(this.canvasBufferContext);
	
	// double buffering
	this.context.clearRect(0 , 0, this.canvas.width, this.canvas.height);
	this.context.drawImage(this.canvasBuffer, 0, 0);
	
	// mesure framerate
    this._frameCounter++;
    document.getElementById("fps").innerHTML = (Math.floor(this._frameCounter / (new Date().getTime() - this._startTime)*10000)/10)+"fps";
    if(this._frameCounter > 30) {
        this._frameCounter = 0;
        this._startTime = new Date().getTime();
    }
	// document.getElementById("fps").innerHTML = (Math.floor(10000/(new Date().getTime() - this._startTime)) / 10)+" fps";
};