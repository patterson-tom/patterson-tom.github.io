keys = new Map([[223,1], [49, 2], [50, 3], [51, 4], [52, 5], [53, 6], [54, 7], [55, 8], [56, 9], [57, 10], [48, 11], [189, 12], [187, 13], [8, 14], [9, 15], [81, 16], [87, 17], [69, 18], [82, 19], [84, 20], [89, 21], [85, 22], [73, 23], [79, 24], [80, 25], [219, 26], [221, 27], [20, 28], [65, 29], [83, 30], [68, 31], [70, 32], [71, 33], [72, 34], [74, 35], [75, 36], [76, 37], [186, 38], [192, 39], [222, 40], [220, 41], [90, 42], [88, 43], [67, 44], [86, 45], [66, 46], [78, 47], [77, 48], [188, 49], [190, 50], [191, 51], [32, 52]]);

white = [1, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 33, 35, 37, 39, 40, 42, 44, 45, 47, 49, 51, 52];
black = [2, 5, 7, 10, 12, 14, 17, 19, 22, 24, 26, 29, 31, 34, 36, 38, 41, 43, 46, 48, 50];

pressed = [52];
for (var i = 0; i < 52; i++){
	pressed[i] = false;
}

document.onkeydown = function(event){
	if (event.keyCode == 9){
		event.preventDefault();
	}
	
	var key = keys.get(event.keyCode);
	setColor(key, true);
	if (!pressed[key-1]){
		pressed[key-1] = true;
		
		key = (key+12).toString().padStart(3, "0");	
	
		var sound = 'sounds/'+(39147+parseInt(key))+'__jobro__piano-ff-'+key+'.wav';
	
		var audio = new Audio(sound);
		audio.play();
		
	}
};

document.onkeyup = function(event){
	var key = keys.get(event.keyCode);
	setColor(key, false);
	pressed[key-1] = false;
};
	
function drawPiano(){	
	var canvas = document.getElementById("piano");
	var ctx =  canvas.getContext("2d");
	ctx.fillStyle = "#000000";
	
	for (var i = 0; i < 31; i++){
		ctx.strokeRect(i*40, 0, 40, 400);
	}
	
	for (var i = 0; i < 30; i++){
		i2 = (i-2)%7;
		if (i2 != -1 && i2 != 2 && i2 != 6){
			ctx.fillRect(i*40+30, 0, 20, 200);
		}
	}
}	

function setColor(key, pressed){
	
	var canvas = document.getElementById("piano");
	var ctx =  canvas.getContext("2d");
	ctx.fillStyle = "#FFFF00"; 
	
	if (white.includes(key)){
		i = white.indexOf(key);
		if (!pressed) ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(i*40, 0, 40, 400);
		ctx.fillStyle = "#000000";
		ctx.strokeRect(i*40, 0, 40, 400);
		if (black.includes(key+1)) ctx.fillRect(i*40+30, 0, 20, 200);
		if (black.includes(key-1)) ctx.fillRect((i-1)*40+30, 0, 20, 200);
	}else if (black.includes(key)){
		if (!pressed) ctx.fillStyle = "#000000";
		i = white.indexOf(key-1);
		ctx.fillRect(i*40+30, 0, 20, 200);
	}
}