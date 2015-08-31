var filled;
var marked;
var theCanvas;
var winningCombinations;
var squaresFilled = 0; // add 1 every cycle
var turn = 0; // add 1 every cycle
var noiseGun = new Audio('sounds/shotgun.mp3');
var noiseTires = new Audio('sounds/tires.mp3');
var noiseNux = new Audio('sounds/nux.mp3');
var noiseStart = new Audio('sounds/TwoMen.mp3')


window.onload=function(){
  // make array for filled - this will be true/false to "Is the boxed filled"
	filled = new Array();
  // make array for marked - this will have either an X or O
	marked = new Array();
  //create a variable of all the winning arrays (an array of win arrays)
  winningCombinations = [
    // top row
    [0,1,2],
    // middle row
    [3,4,5],
    // bottow row
    [6,7,8],
    // first column
    [0,3,6],
    // second column
    [1,4,7],
    // third column
    [2,5,8],
    // diagonal top right to bottom left
    [0,4,8],
    // diagonal top left to bottom right
    [2,4,6]
  ];
  // throw info into [empty] and [marked] so that they add either a false(empty)/marked(true) or a string of X and O
	for(var i = 0; i <= 8; i++){
	// empty array true/false
  // false = the box is empty there is nothing in it
  filled[i] = false;
	// Sting of what is in the box
  marked[i]='';
	}
	noiseNux.play();

}

//Game methods
function canvasClicked(canvasNumber) {
	// abbreviate
  theCanvas = "canvas"+canvasNumber;
  //canvas = $('#'+theCanvas)
  // abbreviate
  canvas = document.getElementById(theCanvas);
	// shorten the script so we aren't repeating as much
  context = canvas.getContext("2d");
  // if the canvas is empty set it to false
	if(filled[canvasNumber-1] == false) {
		// if the turn is divisible by 2 then we are marking Xs
    if(turn % 2 == 0) {
			// call to begin the path of the mark
      context.beginPath();
      // move from (10,10) to..
      context.moveTo(20,20);
			// .. (90,90) to make a mark top left to bottom right
      context.lineTo(80,80);
			// move (90,10) to ...
      context.moveTo(80,20);
			// (10,90) to make a mark top right to bottom left
      context.lineTo(20,80);
			// make the bone ends

    	context.strokeStyle = '#E1D4C0';
      // adjust the width to a more visible size
      context.lineWidth = 10;
      // use lineCap to change the end of the line to 'round'
      context.lineCap = 'round';
      // tell the computer to make the stroke(s)
      context.stroke();
			//end the path of the mark
      context.closePath();
			// make bone ends
			context.beginPath();
			context.arc(25,15,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(15,25,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(15,75,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(25,85,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(75,15,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(85,25,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(85,75,5,0,Math.PI*2);
			context.stroke();
			context.closePath();
			context.beginPath();
			context.arc(75,85,5,0,Math.PI*2);
			context.stroke();
      // add sound to click
			// Shout out to Bobby
			noiseGun.play();
			// in the marked array an 'X' in the proper index
      marked[canvasNumber-1] = 'X';

    } else {
			// start the path
      context.beginPath();
			// make a circle context.arc() and mark it as true
      // context.arc(x center, y center, radius, start angle, end angle)
      context.arc(50,50,40,0,Math.PI*2,true);
			// make hub
      // set a color
      context.strokeStyle = '#000000';
      // make the width larger so it's easier to see
      context.lineWidth = 10;
      // make the stroke
      context.stroke();
      // close the path of the line
      context.closePath();
			// create center hub
			context.beginPath();
			context.arc(50,50,5,0,Math.PI*2, true);
			context.stroke();
			context.closePath();
			// create spokes.... maybe
			// or wheel
			context.beginPath();
			context.strokeStyle = '#000000'
			context.lineWidth = 5;
			context.moveTo(50,50);
			context.lineTo(50,90);
			context.stroke();
			context.moveTo(10,50);
			context.lineTo(90,50);
			context.stroke();
			// add sound to click
			// shout out to Bobby
			noiseTires.play()
      // in the marked array add an 'O' to that spot
      marked[canvasNumber-1] = 'O';
			}

    // after ever turn add 1 to turn
    // this checks whether an X or an O will be played
		turn +=1;
		//
    filled[canvasNumber-1] = true;
		// every turn add 1 to squares filled
    squaresFilled++;
    console.log(filled)
    console.log(marked)

		findWinner(marked[canvasNumber-1]);


    // what happens if there are 9 squares filled and no one wins?
    // every click we add 1 to turns
    // if squares filled and a winner hasn't been reached alert that that there is no winner
		// if it's a tie
		if(squaresFilled === 9) {
			// alert that no one won
      alert("NONE SHALL ADVANCE TO VALHALLA!");
			// reload the page
      // NEED work around can't incorporate scoreboard if we reload the whole page each time
      location.reload(true);
		}

	}

  	else {
	  // if they click where someone played already let them know that they can't
  	alert("Two things can't occupy the same place at the same time! Stop trying to break physics!");
	}
}

// Function to find a winner
// look back to RPS project
// winner is going to have the marked array as true && the symbols as either all X or O
function findWinner(symbol){

	for(var j = 0; j < winningCombinations.length; j++){
	// check to see what the symbol is (_, X, O)
	// 3 boxes needed to win (0,1,2)
	// if those three end up being boxes in the winningCombinations array then the game is over
	if(marked[winningCombinations[j][0]] == symbol&&marked[winningCombinations[j][1]] ==	symbol&&marked[winningCombinations[j][2]] == symbol) {
		// set an alert to someone has won
		alert("THE PLAYER WHO USED "+symbol+" SHALL RECIEVE SHINY AND ASCEND TO VALHALLA!");
		// launch the tryAgain function to play again
		tryAgain();
	}
	}

}
// Function to play again
function tryAgain() {
	// confirm === alert but with confirm OK = true Cancel = false
	confirm("If you're 100% SNAFU you'll play again! Click ENTER to try again!");
	noiseNux.play();
	// if they hit enter reload the page
	if (true) {
		// .reload on location will reload the page the user is on
		location.reload(true);
		// if they don't want to play again
	} else {

		alert("Don't do this to me, please! Aw, Sweet Jesus! I was sick! Don't bring this on me, PLEASE!");
	}
}
