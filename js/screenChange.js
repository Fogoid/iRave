var i = 0;
var stackTo = new Array();
var stackFrom = new Array();
var functionIsRunning = false;
var order=false;

function goBack(){
	var from = stackFrom.pop();
	var to = stackTo.pop();

	change(from, to, '3');
}

function insert(a, b){
	stackTo.push(a);
	stackFrom.push(b); 
}

function change(a, b, c){
	document.getElementById(a).style.display = "none";
	document.getElementById(b).style.display = "block";
	
	if( b != 'mainMenu') {
		document.getElementById("descriptionText").innerHTML = b;
	}
	
	if(b == 'mainMenu') {
		if(a == 'lockScreen'){
			document.getElementById("header").style.height = "10%";
			document.getElementById("time").style.fontSize = "11px";
			document.getElementById("time").style.color = "white";
			document.getElementById("dateRow").style.display = "none";
			document.getElementById("timer").style.height = "100%";
			document.getElementById("description").style.display = "block";
			
		}
		document.getElementById("descriptionText").style.visibility = "hidden";
	}
	else {
		document.getElementById("descriptionText").style.visibility = "visible";
	}

	switch(b){
		case 'Concerts':
			document.getElementById("swipeLeft").onclick = function() { changeConcertStage('right') };
			document.getElementById("swipeRight").onclick = function() { changeConcertStage('left') };
			break;
		case 'OtherEvents':
			document.getElementById("swipeLeft").onclick = function() { changeEventZone('right') };
			document.getElementById("swipeRight").onclick = function() { changeEventZone('left') };
			break;

	}

	if(c == '1'){
		insert(a, b);
	}

}

function startTime() {
		    var today = new Date();
		    var h = today.getHours();
		    var m = today.getMinutes();
		    var d = today.getDate();
		    var mon = today.getMonth();
		    var y = today.getFullYear();
		    m = checkTime(m);
		    mon = checkDate(mon);
		    document.getElementById("time").innerHTML = h + ":" + m;
		    document.getElementById("date").innerHTML = d + " de " + mon + ", " + y;
		    var t = setTimeout(startTime, 500);
		    
		    if(!i){ 
		    	document.getElementById("time").style.fontSize = "30px";
				document.getElementById("time").style.color = "orange";
				document.getElementById("time").style.fontWeight = "bold";
		    	document.getElementById("date").style.fontSize = "9px";
				++i;
			}
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function checkDate(i){
	switch(i) {
		case 0:
			return "janeiro";
		case 1:
			return "fevereiro";
		case 2:
			return "março";
		case 3:
			return "abril";
		case 4:
			return "maio";
		case 5:
			return "junho";
		case 6:
			return "julho";
		case 7:
			return "agosto";
		case 8:
			return "setembro";
		case 9:
			return "outubro";
		case 10:
			return "novembro";
		case 11:
			return "dezembro";
	}
}

function nightMode() {
  var cols = document.getElementsByClassName('screen');
  var checkBox = document.getElementById("nightCheck");
  if(nightCheck.checked==true){
  	for(i=0; i<cols.length; i++) {
  		cols[i].style.opacity = '0.5';
  	}
  }
  else{
  	  for(i=0; i<cols.length; i++) {
    	cols[i].style.backgroundColor = 'black';
    	cols[i].style.opacity = '1';

  	}

  }
}

function changeConcertDay(side){
	if(document.getElementById("1 A").style.display != 'none'){
		if(side == 'right'){
			document.getElementById("1 A").style.display = 'none';
			document.getElementById("2 A").style.display = 'block';
			document.getElementById("Day").innerHTML = 'Day 2';
		}
	}
	if(document.getElementById("1 B").style.display != 'none')
		if(side == 'right'){
			document.getElementById("1 B").style.display = 'none';
			document.getElementById("2 A").style.display = 'block'; 
			document.getElementById("Day").innerHTML = 'Day 2';
			document.getElementById("Stage").innerHTML = 'Stage A';
			document.getElementById("rightCircleConcerts").src = "img/circle-notfull.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-full.png";
		}
	if(document.getElementById("2 A").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 A").style.display = 'none';
			document.getElementById("1 A").style.display = 'block';
			document.getElementById("Day").innerHTML = 'Day 1';
		}
	if(document.getElementById("2 B").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 B").style.display = 'none';
			document.getElementById("1 A").style.display = 'block';
			document.getElementById("Day").innerHTML = 'Day 1';
			document.getElementById("Stage").innerHTML = 'Stage A';
			document.getElementById("rightCircleConcerts").src = "img/circle-notfull.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-full.png";
		}
}

function changeConcertStage(side){
	if(document.getElementById("1 A").style.display != 'none'){
		if(side == 'right'){
			document.getElementById("1 A").style.display = 'none';
			document.getElementById("1 B").style.display = 'block';
			document.getElementById("Stage").innerHTML = 'Stage B';
			document.getElementById("rightCircleConcerts").src = "img/circle-full.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-notfull.png";
		}
	}
	if(document.getElementById("1 B").style.display != 'none')
		if(side == 'left'){
			document.getElementById("1 B").style.display = 'none';
			document.getElementById("1 A").style.display = 'block';
			document.getElementById("Stage").innerHTML = 'Stage A';
			document.getElementById("rightCircleConcerts").src = "img/circle-notfull.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-full.png";
		}
	if(document.getElementById("2 A").style.display != 'none')
		if(side == 'right'){
			document.getElementById("2 A").style.display = 'none';
			document.getElementById("2 B").style.display = 'block';
			document.getElementById("Stage").innerHTML = 'Stage B';
			document.getElementById("rightCircleConcerts").src = "img/circle-full.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-notfull.png";
		}
	if(document.getElementById("2 B").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 B").style.display = 'none';
			document.getElementById("2 A").style.display = 'block';
			document.getElementById("Stage").innerHTML = 'Stage A';
			document.getElementById("rightCircleConcerts").src = "img/circle-notfull.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-full.png";
		}
}

function changeEventDay(side){
	if(document.getElementById("1 G").style.display != 'none'){
		if(side == 'right'){
			document.getElementById("1 G").style.display = 'none';
			document.getElementById("2 G").style.display = 'block';
			document.getElementById("EventDay").innerHTML = 'Day 2';
		}
	}
	if(document.getElementById("1 P").style.display != 'none')
		if(side == 'right'){
			document.getElementById("1 P").style.display = 'none';
			document.getElementById("2 G").style.display = 'block'; 
			document.getElementById("EventDay").innerHTML = 'Day 2';
			document.getElementById("Zone").innerHTML = 'Pool Zone';
			document.getElementById("rightCircleConcerts").src = "img/circle-notfull.png";
			document.getElementById("leftCircleConcerts").src = "img/circle-full.png";
		}
	if(document.getElementById("2 G").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 G").style.display = 'none';
			document.getElementById("1 G").style.display = 'block';
			document.getElementById("EventDay").innerHTML = 'Day 1';
		}
	if(document.getElementById("2 P").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 P").style.display = 'none';
			document.getElementById("1 G").style.display = 'block';
			document.getElementById("EventDay").innerHTML = 'Day 1';
			document.getElementById("Zone").innerHTML = 'Green Zone';
			document.getElementById("rightCircleEvent").src = "img/circle-notfull.png";
			document.getElementById("leftCircleEvent").src = "img/circle-full.png";
		}
}

function changeEventZone(side){
	if(document.getElementById("1 G").style.display != 'none'){
		if(side == 'right'){
			document.getElementById("1 G").style.display = 'none';
			document.getElementById("1 P").style.display = 'block';
			document.getElementById("Zone").innerHTML = 'Pool Zone';
			document.getElementById("rightCircleEvent").src = "img/circle-full.png";
			document.getElementById("leftCircleEvent").src = "img/circle-notfull.png";
		}
	}
	if(document.getElementById("1 P").style.display != 'none')
		if(side == 'left'){
			document.getElementById("1 P").style.display = 'none';
			document.getElementById("1 G").style.display = 'block';
			document.getElementById("Zone").innerHTML = 'Green Zone';
			document.getElementById("rightCircleEvent").src = "img/circle-notfull.png";
			document.getElementById("leftCircleEvent").src = "img/circle-full.png";
		}
	if(document.getElementById("2 G").style.display != 'none')
		if(side == 'right'){
			document.getElementById("2 G").style.display = 'none';
			document.getElementById("2 P").style.display = 'block';
			document.getElementById("Zone").innerHTML = 'Pool Zone';
			document.getElementById("rightCircleEvent").src = "img/circle-full.png";
			document.getElementById("leftCircleEvent").src = "img/circle-notfull.png";
		}
	if(document.getElementById("2 P").style.display != 'none')
		if(side == 'left'){
			document.getElementById("2 P").style.display = 'none';
			document.getElementById("2 G").style.display = 'block';
			document.getElementById("Zone").innerHTML = 'Green Zone';
			document.getElementById("rightCircleEvent").src = "img/circle-notfull.png";
			document.getElementById("leftCircleEvent").src = "img/circle-full.png";
		}
}





function playAudio() { 
	var x = document.getElementById("myAudio");
    x.play(); 
} 
var order=false;
function pop() {
	order=true;
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}


function move() {


		
    	var elem = document.getElementById("myBar"); 
    	var width = 1;
    	
    	var id = setInterval(frame, 50);
    
 
    	function frame() {
        	if (width >= 100) {
        		playAudio();
        		pop();
        		
        		functionIsRunning = false;
            	clearInterval(id);

        	} else {
            	width++; 
            	elem.style.width = width + '%'; 
            	elem.innerHTML = width * 1 + '%';
        	}

    	}
    	
 	

}



function multiple(){
    change('TakeAway', 'Progress', '1');

    if(functionIsRunning !=true ){
    	functionIsRunning = true;
    	move();
    	
    }
}


