/**
* Class extension utility function
* @param base The base class
* @param constructor The constructor function for the new class
*/
function extend(base, constructor) {
    var prototype = new Function();
    prototype.prototype = base.prototype;
    constructor.prototype = new prototype();
    constructor.prototype.constructor = constructor;
}