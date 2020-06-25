//generates a scramble, given the number of layers in the puzzle and the length of the scramble
function genScramble(puzzleSize, scrambleLength)
{	
	//checks inputs are valid
	var errorString = areInputsValid(puzzleSize, scrambleLength);
	if (errorString != ""){
		document.getElementById("scramble").innerHTML = errorString;
		return;
	} 
	
	//building blocks for all possible moves
	var faces = ["R", "U", "F", "L", "D", "B"];
	var suffixes = ["", "'", "2"];
	var maxWideTurns = Math.floor(puzzleSize/2);
	var even = puzzleSize % 2 == 0;

	var wideTurns;
	var prefix;
	var randFace;
	var wideTurn;
	var randSuffix;
	var prevWideTurns;
	var maxFace;
	var disallowedFaces;
	var scramble = "";
	var prevFace;
	var usedWideMoves = [];
	
	//get scrambleLength moves
	for (var i = 1; i <= scrambleLength; i++){
		
		//updates prevFace for this iteration
		prevFace = randFace;
		
		//gets a new value for wideTurns
		wideTurns = randInt(1, maxWideTurns);
		
		//if there are 3 or more layers moved at once, a prefix is assigned
		prefix = wideTurns >= 3 ? wideTurns : "";
		
		//only uses RFU on maximum wide turn big cubes
		maxFace = even && wideTurns == maxWideTurns ? 2 : 5;
		
		//disallows the face used previously and only allows same axis faces in one order (R->L, U->D, F->B)
		disallowedFaces = prevFace >= 3 ? [prevFace, prevFace - 3] : [prevFace];
	
		//gets new randFace, disallowing disallowedFaces if necessary
		randFace = contains(usedWideMoves, wideTurns) ? randIntWithout(0, maxFace, disallowedFaces) : randInt(0,maxFace);
		
		//error checking from the randIntWithout function call
		if (randFace == -1){
			alert("Error: unable to find a random face");
			return;
		}
		
		//updates the list of usedWideMoves for the current face e.g. R U Uw, would mean the list is [1, 2] from the U moves
		if (prevFace == randFace) usedWideMoves.push(wideTurns); 
		else usedWideMoves = [wideTurns];
		
		//adds a 'w' if needed (2 or more wide turns)
		wideTurn = wideTurns >= 2 ? "w" : "";
		
		//assigns a random suffix
		randSuffix = randInt(0,2);
		
		//adds this move onto the scramble string
		scramble += prefix + faces[randFace] + wideTurn + suffixes[randSuffix] + " ";
	}
	
	//display the scramble
	document.getElementById("scramble").innerHTML = scramble;
	
	//draws the scramble
	resetCanvas(document.getElementById("scrambleDrawing"));
	var cube = new Cube(puzzleSize);
	cube.scramble(scramble);
	cube.draw();
}

//validates the inputs
function areInputsValid(puzzleSize, scrambleLength)
{
	var errorString = "";
	
	if (isNaN(puzzleSize) || puzzleSize != Math.floor(puzzleSize) || puzzleSize <= 1 || puzzleSize > 15) 
		errorString += "Error: Puzzle size must be an positive integer between 2 and 15 (inclusive)<br>";
	if (isNaN(scrambleLength) ||  scrambleLength != Math.floor(scrambleLength) || scrambleLength <= 0) 
		errorString += "Error: Scramble length must be a positive integer";
	
	return errorString;
}

//wrapper function to make getting random ints easier for my simple mind
function randInt(lower, upper)
{	
	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/*random integer in a range, excluding some possible outcomes
will return -1 if no possible values*/
function randIntWithout(lower, upper, avoid)
{
	var rand = Math.floor(Math.random() * (upper - lower)) + lower;
	var initRand = rand;
	while (contains(avoid, rand)){
		rand = rand < upper ? ++rand : lower;
		if (rand == initRand) return -1;
	}
	return rand;
}

//checks if an array contains a certain value
function contains(array, value)
{
	for (var i = 0; i < array.length; i++){
		if (array[i] == value) return true;
	}
	return false;
}