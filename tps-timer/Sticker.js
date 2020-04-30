class Sticker{
	
	constructor(face, color)
	{
		this._face = face;
		this._color = color;
		
		//all possible new faces for all possible moves
		this._faceRotationMap = new Map([["R", ["F", "U", "B", "D"]], ["L", ["F", "U", "B", "D"]], 
								["U", ["F", "L", "B", "R"]], ["D", ["F", "L", "B", "R"]], 
								["F", ["U", "R", "D", "L"]], ["B", ["U", "R", "D", "L"]]]);
	}
	
	//draw the scramble
	draw(x, y, z, size)
	{
		//get the canvas context and set the color
		var canvas = document.getElementById("scrambleDrawing");
		var ctx =  canvas.getContext("2d");
		ctx.fillStyle = this._color;
		
		
		var interval = Math.round(100/size); //the interval between the starting points of each sticker on the face
		var width = 90/size; //the width/height of each sticker
		
		//draws the sticker in the correct location based on the face
		switch(this._face){
			case "U":
				ctx.fillRect(110 + (interval*x),interval*z,width,width);
				break;
			case "L":
				ctx.fillRect(interval*z,110 + (interval*y),width,width);
				break;
			case "F":
				ctx.fillRect(110 + (interval*x),110 + (interval*y),width,width);
				break;
			case "R":
				ctx.fillRect(220 + (interval*(size-1-z)),110 + (interval*y),width,width);
				break;
			case "B":
				ctx.fillRect(330 + (interval*(size-1-x)),110 + (interval*y),width,width);
				break;
			case "D":
				ctx.fillRect(110 + (interval*x),220 + (interval*(size-1-z)),width,width);
				break;
			
		}
		
	}
	
	//updates which face the sticker is on
	move(face, suffix)
	{
		//if sticker is on the face which is turning, it does not change
		if (face == this._face) return;
		
		//produces an array of all possible faces for this move, in order
		var faceRotation = this._faceRotationMap.get(face);
		
		//updates the face based on the current face and the suffix of the move
		this._face = faceRotation[(faceRotation.indexOf(this._face) + suffix)%4];
	}
}