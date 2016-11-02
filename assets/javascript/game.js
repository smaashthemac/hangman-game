// word bank //
var word = ["harry", "voldemort", "wand", "owl", "muggle", "broom", "hogwarts", "wizard", "witch", "castle"];

// randomly chooses from word array
var chooseWord = word[Math.floor(Math.random() * word.length)];
document.querySelector("#blankWord").innerHTML = "_ " * chooseWord.length;