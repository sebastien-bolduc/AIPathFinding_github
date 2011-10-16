/**
 * Constructor that create our game object.
 * @param (no arguments)
 * @class
 * This class take care of creating our game object and then start it 
 * (by which we mean the "game loop").
 */
function Program()
{
}

/**
 * The main entry point for our gaming application.
 * @param (no arguments)
 * @return (nothing)
 */
Program.prototype.main = function()
{
    var game = new Game1(); 
    
    game.run();
};

// this will allow us to start the game
var program = new Program();