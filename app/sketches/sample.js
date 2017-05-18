// If you need to call p5 (to create sound interfaces, for instance), you have to import it. You can also use ES2015 style imports, if you like:
var p5 = require('p5');
// Or (for ES2015 style):
// import p5 from 'p5';

var canvas, width, interval;

window.setup = function() {
	canvas = createCanvas(640,480);
	// Attach the parent to our root node:
	canvas.parent('sketch'); 
	// Set a random width for our circle:
	width = random(15, 65);
	// Change the circle's width every second:
	interval = setInterval(function() {
		width = random(15, 65);
	}, 1000)
}

window.draw = function() {
	background(255)
	ellipse(mouseX, mouseY, width, width)
}

// This function runs when the user leaves this sketch:
window.unload = function() {
	// Stop the random width setting interval (defined in setup)
	// from running:
	clearInterval(interval)
}