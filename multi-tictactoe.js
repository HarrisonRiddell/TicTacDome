var empty;
var marked;
var winningCombinations;
var turn = 0;
var theCanvas;
var squaresFilled = 0;
var w;
var y;

window.onload=function(){

	empty = new Array();

	marked = new Array();

  winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

	for(var i = 0; i <= 8; i++){
	// empty array true/false
  // true = the box is empty there is nothing in it
  empty[i] = false;
	// Sting of what is in the box
  marked[i]='';
	}
}

//Game methods
function canvasClicked(canvasNumber) {
	theCanvas = "canvas"+canvasNumber;
	canvas = $('#'+theCanvas)
  canvas = document.getElementById(theCanvas);
	context = canvas.getContext("2d");

	if(empty[canvasNumber-1] == false) {
		// if the turn is divisible by 2 than it's players turn
    if(turn % 2==0) {
			// call to begin the path of the mark
      context.beginPath();
      // move from (10,10) to..
      context.moveTo(10,10);
			// .. (90,90) to make a mark top left to bottom right
      context.lineTo(90,90);
			// move (90,10) to ...
      context.moveTo(90,10);
			// (10,90) to make a mark top right to bottom left
      context.lineTo(10,90);
			// style the line
      context.strokeStyle = '#FF0000';
      // adjust the width to a more visible size
      context.lineWidth = 10;
      // use lineCap to change the end of the line to 'round'
      context.lineCap = 'round';
      // tell the computer to make the stroke(s)
      context.stroke();
			//end the path of the mark
      context.closePath();
      // in the marked array with an X in the proper spot
       marked[canvasNumber-1] = 'X';



    } else {
			// start the path
      context.beginPath();
			// make a circle context.arc() and mark it as true
      // context.arc(x center, y center, radius, start angle, end angle)
      context.arc(50,50,40,0,Math.PI*2,true);
      // set a color
      context.strokeStyle = '#0000FF';
      // make the width larger so it's easier to see
      context.lineWidth = 10;
      // make the stroke
      context.stroke();
      // close the path of the line
      context.closePath();
      // in the marked array add a O to that spot
      marked[canvasNumber-1] = 'O';


		}
    // log everything that we need
    // remember to comment this out later
    console.log(empty)
    console.log(marked)

    // keep going back and forth with turns
		turn +=1;
		//
    empty[canvasNumber-1] = true;
		//
    squaresFilled++;

    // what happens if there are 9 squares filled and no one wins?
		if(squaresFilled==9) {
			// alert that no one won
      alert("NO ONE SHALL ADVANCE TO VALHALLA");
			// reload the page
      // NEED work around can't incorporate scoreboard if we reload the whole page each time
      location.reload(true);
		}

	}

  else{
	  // if they click where someone played already let them know that they can't
  	alert("Two things can't occupy the same place at the same time! Stop trying to break physics!");
	}
}
// Function to find a winner



// Function to play again
