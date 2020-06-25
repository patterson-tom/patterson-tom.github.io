//simulation of an entire NxNxN cube
class Cube{
	
	constructor(size)
	{
		this._size = size;
		this._cubies = new Array();
		
		//loops through all xyz locations, creating a new Cubie if needed
		var addedCubies = 0;
		for (var i = 0; i < Math.pow(this._size, 3); i++){
			
			//works out the xyz values at this point
			var x = i % this._size;
			var y = Math.floor(i / Math.pow(this._size, 2));
			var z = Math.floor(i/this._size) % this._size;
			
			//if a cubie is needed here (on the outside of the puzzle), then create one
			if (x == 0 || x == this._size - 1 || y == 0 || y == this._size - 1 || z == 0 || z == this._size - 1){
				this._cubies[addedCubies] = new Cubie(x, y, z, this._size);
				addedCubies++;
			}
		}
	}
	
	//calls the draw function on each cubie
	draw()
	{
		for (var i = 0; i < this._cubies.length; i++){
			this._cubies[i].draw();
		}
	}
	
	//simulates a scramble on the cube
	scramble(scramble)
	{
		//splits the scramble string into an array of moves
		var moves = scramble.split(" ");
		
		//loops through each move
		for (var j = 0; j < moves.length; j++){
			
			//deconstructs that move into its components
			var prefix = isNaN(moves[j].substr(0,1)) ? "" : moves[j].substr(0,1);
			var face = prefix == "" ? moves[j].substr(0,1) : moves[j].substr(1,1);
			var wide = moves[j].includes("w");
			var suffix = wide ? moves[j].substr(moves[j].indexOf("w")+1) : moves[j].substr(1);
			if (prefix == "") prefix = wide ? 2 : 1;
			
			//converts the suffix to an integer value
			switch(suffix){
				case "":
					suffix = 1;
					break;
				case "2":
					suffix = 2;
					break;
				case "'":
					suffix = 3;
					break;
			}
			
			//loops through each cubie
			for (var i = 0; i < this._cubies.length; i++){
				
				//determines whether the move actually affects this cubie
				var moveNeeded = false;
				switch(face){
					case "U":
						if (this._cubies[i]._y < prefix) moveNeeded = true;
						break;
					case "L":
						if (this._cubies[i]._x < prefix) moveNeeded = true;
						break;
					case "F":
						if (this._cubies[i]._z >= this._size - prefix) moveNeeded = true;
						break;
					case "R":
						if (this._cubies[i]._x >= this._size - prefix) moveNeeded = true;
						break;
					case "B":
						if (this._cubies[i]._z < prefix) moveNeeded = true;
						break;
					case "D":
						if (this._cubies[i]._y >= this._size - prefix) moveNeeded = true;
						break;
				}
				
				//moves the cubie if it is affected
				if (moveNeeded) this._cubies[i].move(face, suffix);
			}
		}
	}
	
	
}