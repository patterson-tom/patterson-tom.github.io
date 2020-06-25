//returns the index of an array within a 2d array
//only works for 3 element 1d arrays, since it is optimised for this application 
//(only used in cubie.js, for 2d arrays with sub-arrays of three elements)
//returns -1 if not found
function indexOf2D(array2d, array1d){
	for (var i = 0; i < array2d.length; i++){
		if (array2d[i][0] == array1d[0] && array2d[i][1] == array1d[1] && array2d[i][2] == array1d[2]){
			return i;
		}
	}
	return -1;
}

// converts a time in raw seconds to a formatted time e.g. (77.200 -> 1:17.200)
function toFormat(seconds)
{
	var hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	hours = hours != 0 ? hours.toString() + ":" : "";
	
	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;
	minutes = parseInt(hours) > 0 && minutes < 10 ? "0" + minutes.toString() : minutes.toString();
	minutes = minutes == 0 && hours == 0 ? "": minutes + ":";
	
	seconds = parseInt(minutes) > 0 && seconds < 10 ? "0" + seconds.toFixed(3).toString() : seconds.toFixed(3).toString();
	
	return hours + minutes + seconds;
}

// converts a formatted time in to a time in raw seconds e.g. (1:17.200 -> 77.200)
function toSeconds(format)
{
	var components = format.split(":");
	var multiplier = 1;
	var seconds = 0;
	
	for (var i = components.length-1; i >= 0; i--){
		seconds += components[i] * multiplier;
		multiplier *= 60;
	}
	
	return seconds;
}

//changes the colour of the timer text
function changeTimerCol(col)
{
	document.getElementById("timer").style.color = col;
}


//draws over the canvas to clear it on a new scramble
function resetCanvas(canvas)
{
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width, canvas.height);
}

//changes the src of an image
function changeImage(img, src)
{
	img.setAttribute("src", src);
}

//saves the current time along with the current scramble
function saveTime()
{
	var time = new Date();
	var day = time.getDate();
	var month = time.getMonth()+1;
	var year = time.getFullYear();
	var date = day + "/" + month + "/" + year;

	var time = document.getElementById("timer").innerHTML;
	var puzzleType = document.getElementById("puzzleType").value;
	
	if (localStorage.getItem("times") == null)
	{
		localStorage.setItem("times", "");
	}

	localStorage.setItem("times", localStorage.getItem("times") + date + "," + puzzleType + "," + time + ";");

}

//removes all records of times
function removeTimes()
{
	localStorage.clear();
}