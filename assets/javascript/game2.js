//// create random words
var words = ["harry", "voldemort", "wand", "owl", "muggle", "broom", "hogwarts", "wizard", "witch", "castle"];

//// pick random word
// give us a random number between 0 and 1
var random = Math.random();

// give us an index for our array that will work
// math is a library with functions to manipulate numbers
// words in array = length propert
// between 0 and 3 with decimals
var indexRandom = random * words.length;

// an integer between 0 and 2
// floor is a method that takes a number and strips out the decimals
var flooredNumber = Math.floor(indexRandom);

// get our random word
var randomWord = words[flooredNumber];
// for cheating purposes, test
console.log("For cheating purposes, the word is " + words[flooredNumber]);
//// display underscores according to chosen word
// this array will be populated dynamically 
var uArr = [];

// this array will be populated with guessed letters 
var guessedLetters = [];

// (variable declaration [initializer], condition [stopping point; when this is false, stop loop], incrementor)
for (var i = 0; i < randomWord.length; i++) {
	uArr.push("_");
}

// variables for guesses remaining, wins, game status
var wins = 0;
document.querySelector("#wins").innerHTML = wins;
var guessesRemain = 12;
document.querySelector("#guessesRemain").innerHTML = guessesRemain;
var correctGuesses = 0;

//get element specifically by id
//var element = document.getElementbyId("guessedWord");

// more generic, get element by id or class...
// like in css
// # targets an id
// . targets a class
// targets a div, p, h1, etc.
var element = document.querySelector("#blankWord");


//var ehtml = element.innerHTML;
//console.log(ehtml);

element.innerHTML = uArr.join(" ");

//// listen for our key up event
document.onkeyup = function (event) {
	// get our entered letter
	var keyChar = event.keyCode;
	// change keycode from a number to a letter
	keyChar = String.fromCharCode(keyChar);
	// change to lowercase
	keyChar = keyChar.toLowerCase();

	
// check to see if guessed letter is inside the guessedLetters array
//variable holds whether or not its true
var flag = false;

for (var i = 0; i < guessedLetters.length; i++) {
	if (keyChar === guessedLetters[i]) {
		flag = true;
		// if we've found it, gtfo
		break;
	} 
}

	if (flag === false) {
		// see if input letter matches any letter in our random word
		for (var i = 0; i < randomWord.length; i++) {
			// compare input letter to current letter
			if (keyChar === randomWord.charAt(i)) {
				uArr[i] = keyChar;
				correctGuesses++;
					if (correctGuesses === randomWord.length) {
						alert("You won! That's almost as cool as defeating Voldemort.");
						wins++
						document.querySelector("#wins").innerHTML = wins;	
					}
			} 
		}

			// push/add letter to our guessed letters array
			guessedLetters.push(keyChar); 
			// subtract from guesses remain
			guessesRemain--;
			// update guessesRemain on screen
			document.querySelector("#guessesRemain").innerHTML = guessesRemain;	
			if (guessesRemain == 0) {
				alert("What are you, a muggle? Try again.");
				location.reload();
			}
		
			// updates the html to show
			document.querySelector("#blankWord").innerHTML = uArr.join(" ");
			document.querySelector("#lettersGuessed").innerHTML = guessedLetters.join(" ");

	}

};



//// to do stuff

// STYLING
	// what happens when they win?
	// when they lose?

// start game over while keeping wins count intact

