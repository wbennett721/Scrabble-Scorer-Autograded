// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
       
	  }
	}
  
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
 
 
 return word;
};
let simpleScorerobj = {
   name: "Simple Score",
   desc: "Each letter is worth 1 point",
   scorerFunction: simpleScorer
 };
 function simpleScorer(word) {
   
   return word.length;
 }



let vowelBonusScorerobj = {
   name: "Bonus Vowels",
   desc: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer

}

function vowelBonusScorer(word) {
   let score = 0;
   const vowel = ["A", "E", "I", "O", "U"];

   for (let i = 0; i < word.length; i++) {
      if(vowel.includes(word[i].toUpperCase())) {
      score += 3; 
      } else {
         score += 1;
      }
   
   }
  return score;

}
let scrabbleScorerobj = {
   name:"Scrabble",
   desc: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer

}
function scrabbleScorer(word) {
   word = word.toLowerCase();
	let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
 
	
	}
	return score;
}
function oldScrabbleScorerFunction(word) {
   word = word.toUpperCase();
	let score = 0;
   for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			score += Number(pointValue);
		 }
       
	  }
	}
	return score;
}

const scoringAlgorithms = [simpleScorerobj, vowelBonusScorerobj, scrabbleScorerobj];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n" +

   "0 - Simple: One point per character\n" +
   "1 - Vowel Bonus: Vowels are worth 3 points\n" +
   "2 - Scrabble: Uses scrabble point system\n");
  

   let answer = input.question("Enter 0, 1, or 2: ");
   //if(scoringAlgorithms[0].name){
      //console.log("Simple");
   //}else if( scoringAlgorithms[1].name){
      //console.log("Vowel Bonus");
   //}else if(scoringAlgorithms[2].name){
      //console.log("Scrabble");
   //}else {
      //console.log("Enter 0, 1, or 2: ");
   

   
 return scoringAlgorithms[answer];
} 

function transform(oldPointStructure) {
   let letters = "";
   let scoringObject = {};
   for (item in oldPointStructure) {
      for (i = 0; i < oldPointStructure[item].length; i++) {
         letters = oldPointStructure[item][i];
         scoringObject[letters.toLowerCase()] = Number(item);
         
      }
   }

   return scoringObject;
};


let newPointStructure = transform(oldPointStructure);



function runProgram() {
  let word = initialPrompt();
  let answer = scorerPrompt();
  ///console.log(oldScrabbleScorer(word));
  //console.log("oldScrabble Value: " + oldScrabbleScorerFunction(word));
  //console.log("simpleScorer Value: " + simpleScoreFunction(word));
  //console.log("vowelBonusScorer Value: " + vowelBonusScorerFunction(word));
  console.log(`Score for ${word}: ` + answer.scoreFunction(word));
  console.log(newPointStructure);
  }

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
