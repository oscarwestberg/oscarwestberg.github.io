/*	
	Oscar Westberg
	12/11-14
*/

// Global variables
var c = document.getElementById('Canvas');
var ctx = c.getContext("2d");
var columnY = [];
var letter2DArray = [];
var color = "0, 185, 53";

// Initialize variables
function setUp() {
	// For full screen
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	letterSize = 20;
	ctx.font = letterSize + "px Georgia";
	// Letters obtained from inspirational project found at:
	// http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
	// Aside from the chinese letters, all code is mine
	//letters = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
	columns = c.width/letterSize;
	rows = c.height/letterSize;

	// Initialize columns
	for (var i = 0; i < columns; i++) {
		columnY[i] = - letterSize * (Math.floor((Math.random() * (rows + rows/2)) + 1));
	}

	// Initialize letters in a 2D array with a specified letter for each position
	for (var i = 0; i < columns; i++) {
		// Expand array to second dimension
		letter2DArray[i] = [];

		for (var j = 0; j < rows; j++) {
			letter2DArray[i][j] = Math.floor(Math.random() * letters.length);
		}
	}
}

// Called every time the canvas is updated
function draw() {
	// Clear screen
	ctx.clearRect(0, 0, c.width, c.height);

	// Loop through all columns
	for (var i = 0; i < columns; i++) {
		var alpha = 0.8;
		var decay = 40;

		columnY[i] += letterSize;

		// Has the letter row reached bottom?
    	if (columnY[i] >= c.height + decay * letterSize)
    		columnY[i] = letterSize;

    	// For a number of position upwards, decrease alpha and draw
		for (var j = 0; j < decay; j++) {	
			var arrayPosY = columnY[i]/letterSize - j - 1;
			var tempLetter = letter2DArray[i][arrayPosY];

			ctx.fillStyle = "rgba( " + color + ", " + alpha + ")";
	    	ctx.fillText(letters[tempLetter], letterSize * i, columnY[i] - j * letterSize);

	    	alpha -= 1/decay;
    	}
	}
}

function changeColor() {
	var radios = document.getElementsByName('rb1');
	var radiosLength = radios.length;

	for (var k = 0; k < radiosLength; k++) {
	    if (radios[k].checked) {
		    color = radios[k].value;
	    }
	}
}

setUp();
setInterval(draw, 50);