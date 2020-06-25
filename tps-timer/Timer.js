//defines the three possible states of the timer
Status = {
	READY : 0, //is waiting and avaible to be started
	RUNNING : 1, //is running
	STOPPED : 2 /*the spacebar has been pressed down, to stop the timer, 
				but the spacebar has not yet been released*/
};

//variables used throughout
var startTime; //when the timer was started
var interval; //the function being repeated to update the timer
var timerStatus = Status.READY; //the status of the timer (see above ENUM)

//starts the timer
function startTimer()
{
	startTime = Date.now();
	interval = setInterval(updateTimer, 1);
}

//updates the timer
function updateTimer()
{
	var timer = document.getElementById("timer");
	timer.innerHTML = toFormat((Date.now() - startTime)/1000);
}

//stops the timer
function stopTimer()
{
	clearInterval(interval);
	saveTime();
}

//resets the timer to 0
function resetTimer()
{
	document.getElementById("timer").innerHTML = '0.000';
}

//listens for when the spacebar is pressed down
document.addEventListener('keydown', function(event) 
{
	if (event.code == 'Space') {
		if (timerStatus == Status.RUNNING){ //stop the timer if it is running
			stopTimer();
			timerStatus = Status.STOPPED;
		}else if(timerStatus == Status.READY){ //reset the timer and make it green if it is ready
			resetTimer();
			changeTimerCol("#00FF00");
		}
	}
});

//listens for when the spacebar is released
document.addEventListener('keyup', function(event) 
{
	if (event.code == 'Space') {
		if (timerStatus == Status.READY){ //start the timer if it is running, and reset the color top white
			startTimer();
			timerStatus = Status.RUNNING;
			changeTimerCol("#FFFFFF");
		}else if(timerStatus == Status.STOPPED){ //make the timer ready if it is stopped
			timerStatus = Status.READY;
		}
	}
});