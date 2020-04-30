var population = [];
var populationSize = 0;

var extendedCharSet = true;
var characters = extendedCharSet ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.,'():-|\\\";@_+=/?!£$%^&*" : "abcdefghijklmnopqrstuvwxyz ";
var numChars = characters.length;

var generation = 0;
var phrase = "";
var phraseLength = 0;

var phraseFound = false;
var mutationRate = 0;
var minMutationRate = 0.001;
var genWaitTime = 0;

class DNA{
	
	constructor(str){
		this.string = str;
		this.fitness = 0;
		
		if (this.string == ""){
			for (var j = 0; j < phraseLength; j++){
				this.string += characters.charAt(Math.floor(Math.random() * numChars));
			}
		}		
	}
	
	breed(partner){
		var midpoint = Math.floor(Math.random() * phraseLength);
		var childString = this.string.substring(0, midpoint) + partner.string.substring(midpoint);
		
		for (var i = 0; i < phraseLength; i++){
			if (Math.random() < mutationRate){
				var newChar = characters.charAt(Math.floor(Math.random() * numChars));
				childString = childString.substring(0, i) + newChar + childString.substring(i+1);
			}
		}
		
		return new DNA(childString);
	}
}

function reset(){
	population = [];
	populationSize = 0;

	extendedCharSet = true;
	characters = extendedCharSet ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.,'():-|\\\";@_+=/?!£$%^&*" : "abcdefghijklmnopqrstuvwxyz ";
	numChars = characters.length;

	generation = 0;
	phrase = "";
	phraseLength = 0;

	phraseFound = false;
	mutationRate = 0;
	minMutationRate = 0.001;
	genWaitTime = 0;
}

function start(phrase_, popSize){
	reset();
	
	phrase = phrase_;
	phraseLength = phrase.length;
	populationSize = popSize;
	
	createStartingPopulation();
	performGeneration();
}

function performGeneration(){
	generation++;
	
	computeFitnessScores();
	
	
	population.sort(function(a, b){
		return b.fitness - a.fitness;
	});
	mutationRate = minMutationRate + 0.005 * (phraseLength - population[0].fitness) / phraseLength;
	
	updateDisplay();
	
	breed();
	
	if (!phraseFound) setTimeout(performGeneration, genWaitTime);
}

function breed(){
	
	var matingPoolSize = Math.ceil(populationSize/100);
	var matingPool = population.slice(0, matingPoolSize);
	
	var fitnessSum = 0;
	for (var i = 0; i < matingPoolSize; i++){
		fitnessSum += matingPool[i].fitness;
	}
	
	var newPopulation = []
	for (var i = 0; i < populationSize; i++){
		var a = getParent(matingPool, fitnessSum);
		var b = getParent(matingPool, fitnessSum);
		var newDNA = a.breed(b);
		newPopulation.push(newDNA);
	}
	
	population = newPopulation;
}

function getParent(matingPool, fitnessSum){
	var parentNumber = Math.floor(Math.random() * fitnessSum);
	var sum = 0;
	for (var i = 0; i < matingPool.length; i++){
		sum += matingPool[i].fitness; 
		if (sum >= parentNumber){
			return matingPool[i];
		}
	}
	return population[populationSize-1];
}

function computeFitnessScores(){
	for (var j = 0; j < populationSize; j++){
		var score = 0;
		var s = population[j].string;
		for (var i = 0; i < phraseLength; i++){
			if (s.charAt(i) == phrase.charAt(i)){
				score++;
			}
		}
		population[j].fitness = score;
		if (score == phraseLength) phraseFound = true;
	}
}

function createStartingPopulation(){
	for (var i = 0; i < populationSize; i++){
		population.push(new DNA(""));
	}
}

function updateDisplay(){
	document.getElementById("info").innerHTML = "Phrase to find: " + phrase + "<br>" +
												"Generation: " + generation + "<br>" +
												"Population Size: " + populationSize + "<br>" +
												"Best fit: " + population[0].fitness + "/" + phraseLength + "<br>" +
												"Worst fit: " + population[populationSize-1].fitness + "/" + phraseLength;
	
	document.getElementById("population").innerHTML = "Best: " + population[0].string + "<br><br>" + 
													  "Worst: " + population[populationSize-1].string;
}