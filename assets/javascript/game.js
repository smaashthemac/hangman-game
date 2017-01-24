// create a giant object that will house all logic and variables - this is good practice for using "this"
var hangmanGame = {

	// array that includes all the words to be chosen
	wordsToPick: {
	    "harry" : {
	      picture: "harry.jpg"
	    },
	    "voldemort" : {
	      picture: "voldemort.jpg"
	    },
	    "wand" : {
	      picture: "wand.jpg"
	    },
	    "owl" : {
	      picture: "owl.jpg"
	    },
	    "muggle" : {
	      picture: "muggle.jpg"
	    },
	    "broom" : {
	      picture: "broom.jpg"
	    },
	    "hogwarts" : {
	      picture: "hogwarts.jpg"
	    },
	    "wizard" : {
	      picture: "wizard.jpg"
	    },
	    "witch" : {
	      picture: "witch.jpg"
	    },
	    "castle" : {
	      picture: "castle.jpg"
	    }
  },

	// Variables that set the initial state of our hangman game.
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  // The setupGame method is called when the page first loads.
  setupGame: function() {
    // Here we pick a random word.
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    console.log("For cheating purposes, the word is " + this.wordInPlay);

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildWordView();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
  },

  // This function is run whenever the user guesses a letter..
  updatePage: function(letter) {
    // If the user has no guesses left, restart the game.
    if (this.guessesLeft === 0) {
      alert("What are you, a muggle? Try again.");
      this.restartGame();
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);

      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
      this.rebuildWordView();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {
      	alert("You won! That's almost as cool as defeating Voldemort.");
        this.restartGame();
      }
    }

  },

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guessesRemain").innerHTML = this.guessesLeft;
      document.querySelector("#lettersGuessed").innerHTML = this.guessedLetters.join(", ");
    }
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guessesRemain").innerHTML = this.guessesLeft;
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildWordView: function() {
    // We start with an empty string.
    var wordView = "";

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#blankWord").innerHTML = wordView;
  },

  // Function that "restarts" the game by resetting all of the variables.
  restartGame: function() {
    document.querySelector("#lettersGuessed").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  // Function that checks to see if the user has won.
  updateWins: function() {

    // this won't work for words with double or triple letters
      // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
      // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      var win = false;
    }
    // Otherwise, we set win to true.
    else {
      var win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win === true) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = this.wins;

      // // Update the image of the band on the page.
      // document.querySelector("#bandDiv").innerHTML = "<img class='bandImage' src='images/" + this.wordsToPick[this.wordInPlay].picture + "' alt='" + this.wordsToPick[this.wordInPlay].song + "'>";

      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    else {
      return false;
    }
  }
};

// Initialize the game when the page loads.
hangmanGame.setupGame();

// When a key is pressed..
document.onkeyup = function(event) {
  // Capture pressed key and make it lowercase.
  hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  // Pass the guessed letter into our updatePage function to run the game logic.
  hangmanGame.updatePage(hangmanGame.letterGuessed);
};