class Cubie{
	
	constructor(x, y, z, size)
	{
		this._x = x;
		this._y = y;
		this._z = z;
		this._size = size;
		
		//adds a new sticker object on each outer face the cubie is on
		this._stickers = new Array();
		if (this._x == 0) this._stickers.push(new Sticker("L", "#FFA500"));
		if (this._y == 0) this._stickers.push(new Sticker("U", "#FFFFFF"));
		if (this._z == 0) this._stickers.push(new Sticker("B", "#0000FF"));
		if (this._x == this._size - 1) this._stickers.push(new Sticker("R", "#FF0000"));
		if (this._y == this._size - 1) this._stickers.push(new Sticker("D", "#FFFF00"));
		if (this._z == this._size - 1) this._stickers.push(new Sticker("F", "#00FF00"));
	}
	
	//calls draw on each sticker
	draw()
	{
		for (var i = 0; i < this._stickers.length; i++){
			this._stickers[i].draw(this._x, this._y, this._z, this._size);
		}
	}
	
	//updates the xyz position of the cubie
	move(face, suffix)
	{	
		//all possible xyz values for the new co-ords
		var zval = this._size - 1 - this._z;
		var yval = this._size - 1 - this._y;
		var xval = this._size - 1 - this._x; 
		
		//provides an array with all the possible new xyz positions, in order
		var faceRotation = new Array([]);
		if (face == "R" || face == "L"){
			faceRotation = [[this._x,zval,this._y], [this._x,yval,zval], [this._x,this._z,yval], [this._x,this._y,this._z]];
		}else if (face == "U" || face == "D"){
			faceRotation = [[zval,this._y,this._x], [xval,this._y,zval], [this._z,this._y,xval], [this._x,this._y,this._z]];
		}else if(face == "F" || face == "B"){
			faceRotation = [[yval,this._x,this._z], [xval,yval,this._z], [this._y,xval,this._z], [this._x,this._y,this._z]];
		}
		
		//if the face is L, D or B then we need to go through faceRotation in reverse order
		if (face == "L" || face == "D" || face == "B") suffix = 4 - suffix;
		
		//get the new position from the array based on the current position and the suffix of the move
		var newPos = faceRotation[(indexOf2D(faceRotation, [this._x,this._y,this._z])+suffix)%4];
		
		//update the xyz values
		this._x = newPos[0];
		this._y = newPos[1];
		this._z = newPos[2];
		
		//moves each sticker
		for (var i = 0; i < this._stickers.length; i++){
			this._stickers[i].move(face, suffix);
		}
	}
	
	
}