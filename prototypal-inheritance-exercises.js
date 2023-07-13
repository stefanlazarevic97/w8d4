// Using surrogate:

// Function.prototype.inherits = function(parent) {
//     function Surrogate() {};
//     Surrogate.prototype = parent.prototype;
//     this.prototype = new Surrogate();
//     this.prototype.constructor = this;
// }

// Using "Object.create":

Function.prototype.inherits = function(parent) {
    this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
}

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

let asteroid = new Asteroid();

console.log(asteroid.__proto__.__proto__.constructor); // => [Function: MovingObject]
console.log(Ship.prototype.__proto__.constructor); // => [Function: MovingObject]
