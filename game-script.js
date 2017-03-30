console.log("game time");

//square constructor
function Square() {
	this.marked = false;
	this.value = value;
}

//Player Constructor
function Player(name, id){
	this.name = name;
	this.id = id;
	this.score = null;
}

// instantiate players and game
player1 = new Player("Player 1", "player1");
player2 = new Player("Player 2", "player2");

//game constructor
function Game() {
	this.currentPlayer = player1;
	this.winner;
	this.over = false;
	this.switchPlayer = false;
	this.currentStrokes = 0;
	this.ticker;
	this.ticker2;
}

let game = new Game();

let gridWidth = 5;
// set counters, account for free space
let rowCount = [0,0,1,0,0];
let colCount = [0,0,1,0,0];
let backslash = 1;
let forwardslash = 1;

let ballOrder;
// create variable for white ball animations
let whiteBallContainer = document.getElementById("white-ball");
// grab each square in the table
var squares = document.querySelectorAll("td");
let reset = document.querySelector('button');

setSquares();

//create random array of ints from min to max
function randomArray(min, max) { 

	// create sortedArray between min and max
	let sortedArray = [];
	for (let i = min; i < (max + 1); i++) {
		sortedArray.push(i);
	}

	let randomArray = [];
	for (let i = 1; i < 76; i++) {
		// pick an integer from sortedArray at a random index,
		let randomIndex = Math.floor(Math.random()*(sortedArray.length));
		let random = sortedArray[randomIndex];

		// remove the element so there are no repeats
		sortedArray.splice(randomIndex, 1);

		// add random int to randomArray
		randomArray.push(random);
	}
	return randomArray;
}

function setSquares() {

let squareValues = randomArray(1,75);
	// Assign each square their random value
	for (let i = 0; i < 25; i++) {
		squares[i].textContent = squareValues[i];
		// assign each square an index
		squares[i].dataset.index = i;
		// create checker pattern
		if (i%2 === 0) {squares[i].style.backgroundColor = "#dbeeff";}
		else {squares[i].style.backgroundColor = "#c9e5ff"; }
	}
	// set free space
	squares[12].textContent = "Free!";

	// create a random array for "calling" the balls
	ballOrder = randomArray(1,75);
	console.log(ballOrder);
}

let whiteBall = document.getElementById('current-ball');
whiteBall.addEventListener("click", function() {
	if (whiteBall.textContent === "Start") {
		startCounter();
	}
})

reset.addEventListener("click", function() {
	location.reload();
});

squares.forEach(function(square) {
	square.addEventListener("click", function() {
		 if (square.textContent === document.getElementById("current-ball").textContent) {
			console.log(square);
			let indy = square.dataset.index;
			console.log("indy" + indy);
			square.style.backgroundColor = "#969aa3";

			let markedCol = indy%gridWidth;
			colCount[markedCol]++;
			if (colCount[markedCol] >= gridWidth) {game.switchPlayer = true;}

			let markedRow = Math.floor(indy/gridWidth);
			rowCount[markedRow]++;
			if (rowCount[markedRow] >= gridWidth) {
				game.switchPlayer = true;
			}
			let x = (colCount - gridWidth);
			console.log("subtraction: " + x);
			console.log(gridWidth);
			console.log(colCount);
			console.log('rowCount: ' + rowCount);
			console.log('colCount: ' + colCount);
			if (indy%(gridWidth+1) === 0) { backslash++; }
			if (backslash >= gridWidth) {game.switchPlayer = true;}
			if (indy == 4 || indy == 8 || indy == 16 || indy == 20) { forwardslash++; }
			if (forwardslash >= gridWidth) {game.switchPlayer = true;}
			console.log("forwardslash: " + forwardslash);
			console.log("backslash: " + backslash);

			console.log("currentPlayerId" + game.currentPlayer.id);
			console.log("switchPlayer: " + game.switchPlayer);

			if (game.switchPlayer && game.currentPlayer.id === "player2") {
				game.over = true;
				clearInterval(game.ticker);
				player2.score = game.currentStrokes;
				console.log('player1score: ' + player1.score);
				console.log('player2score: ' + player2.score);
				document.getElementById(game.currentPlayer.id + "Strokes").textContent = game.currentPlayer.score;
				document.getElementById('player2Score').style.fontWeight = "400";
				if (player1.score < player2.score) {
					alert("Game Over! " + player1.name + " Wins!");
				} else if (player1.score > player2.score) {
					alert("Game Over! " + player2.name + " Wins!" );
				} else {
					alert("Uh Oh, we got a tie.");
				}
			}

			if (game.switchPlayer && game.currentPlayer.id === "player1") {
				alert('nice job ' + game.currentPlayer.name + "! Player 2, you're up!");
				game.currentPlayer.score = game.currentStrokes;
				player1.score = game.currentStrokes;
				document.getElementById(game.currentPlayer.id + "Strokes").textContent = game.currentPlayer.score;
				console.log(game.currentPlayer.name + ' score ' + game.currentPlayer.score);
				document.getElementById('player2Score').style.fontWeight = "800";
				document.getElementById('player1Score').style.fontWeight = "400";
				game.currentPlayer = player2;
				game.switchPlayer = false;
				clearInterval(game.ticker);
				setSquares(); //regenerate board
				whiteBall.textContent = "Start";
				clearCounters();
			}

		 }
	});
});

let ballNumber = -1;
function nextBall() {
	game.currentStrokes++;
	ballNumber++; //for first ball, sets ballNumber to 0, increments by one every time after
	let currentBall = document.getElementById("current-ball");
	currentBall.textContent = ballOrder[ballNumber];
	// whiteBallContainer.className = "white-ball-bounce";
	if (ballNumber >= 74) {ballNumber = -1;}

}

function startCounter() {
	game.currentStrokes = 0; // start the counter over
	nextBall(); // call once to start immediately, then through setInterval()
	game.ticker  = setInterval(function() {
		console.log('Hey! Hey!');
		nextBall();
	}, 4000);
	game.ticker2  = setInterval(function() {
		console.log("ticker2 fully operational");
		if (whiteBallContainer.className === "white-ball-bounce") {
			whiteBallContainer.className = "white-ball";
		} else { whiteBallContainer.className = "white-ball-bounce"; }
	
	}, 2000);
}

function clearCounters() {
	// set counters, account for free space
	rowCount = [0,0,1,0,0];
	colCount = [0,0,1,0,0];
	backslash = 1;
	forwardslash = 1;
	console.log (rowCount);
}

