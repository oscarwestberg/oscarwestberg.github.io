var c = document.getElementById('Canvas');
var ctx = c.getContext("2d");
var columnY = [];
var letter2DArray = [];

function setUp() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	letterSize = 20;
	ctx.font = letterSize + "px Georgia";
	//letters = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
	columns = c.width/letterSize;
	rows = c.height/letterSize;

	// Initialize columns
	for (var i = 0; i < columns; i++) {
		columnY[i] = - letterSize * (Math.floor((Math.random() * (rows + rows/2)) + 1));
	}

	// Initialize letters
	for (var i = 0; i < columns; i++) {
		letter2DArray[i] = [];
		for (var j = 0; j < rows; j++) {
			letter2DArray[i][j] = Math.floor(Math.random() * letters.length);
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height);

	var even = 0;

	for (var i = 0; i < columns; i++) {
		var alpha = 0.8;
		var decay = 40;

		columnY[i] += letterSize;

    	if (columnY[i] >= c.height + decay * letterSize)
    		columnY[i] = letterSize;

		for (var j = 0; j < decay; j++) {	
			var arrayPosY = columnY[i]/letterSize - j - 1;
			var tempLetter = letter2DArray[i][arrayPosY];

			ctx.fillStyle = "rgba(0, 185, 53, " + alpha + ")";
	    	ctx.fillText(letters[tempLetter], letterSize * i, columnY[i] - j * letterSize);

	    	alpha -= 1/decay;
    	}


	}
}

setUp();
setInterval(draw, 50);