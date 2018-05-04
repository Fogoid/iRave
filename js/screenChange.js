var i = 0;
var stackTo = new Array();
var stackFrom = new Array();
var functionIsRunning = false;
var order=false;
var cols = document.getElementsByClassName('screen');
var last;


//fastFood functionality Vars
var foodNames = [ "Bifana", "Burguer", "Cachorro", "Prato Dia", "Especial" ];
var drinkNames = [ "Água", "Coca-Cola", "SuperBock", "IceTea", "7-Up" ];
var foodValue = [ 0, 0, 0, 0, 0];
var	drinkValue = [ 0, 0, 0, 0, 0];

function returnTo(){
	change('Verify', last, 0);
	stackFrom.push(last);
	stackTo.push(TakeAway);
}

function goBack(){
	var from = stackFrom.pop();
	var to = stackTo.pop();

	if(from == "Drinks" || from == "Food"){
		change(from, 'Verify', '1');
		last = from;
	}
	else change(from, to, '3');
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
		if(a == 'Verification' || a == 'Progress'){
			resetValues('Food');
			resetValues('Drinks');
			clearOrder();

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
		case 'TakeAway':
			if(a == 'Verify' && last == "Food"){
				resetValues('Food');
			}
			if(a == 'Verify' && last == "Drinks")
				resetValues('Drinks');
			break;
		case 'CheckOrder':
			writeOrder();
			break;
	}

	if(a == 'CheckOrder'){
		clearOrder();
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

function notification(){
	var checkBoxnote = document.getElementById("noteCheck");
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


		var checkBoxnote = document.getElementById("noteCheck");
    	var elem = document.getElementById("myBar"); 
    	var width = 1;
    	
    	var id = setInterval(frame, 50);
    
 
    	function frame() {
        	if (width >= 100) {
        		
        		if(noteCheck.checked==true){
        			
        			pop();
        			playAudio();
        		}
        		
        		
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
    change('CheckOrder', 'Progress', '1')

    if(functionIsRunning !=true ){
    	var date = new Date();
    	var h = date.getHours();
    	var m = date.getMinutes();
    	m=m+50;
    	if(m>60){
    		h++;
    		m=m-60;
    	}
    	m = checkTime(m);
    	document.getElementById("ordertime").innerHTML = h + ":" + m;
    	document.getElementById("ordertime").style.fontSize = "11px";
		document.getElementById("ordertime").style.color = "white";
		document.getElementById("ordertime").style.fontWeight = "bold";
    	functionIsRunning = true;
    	move();
    	
    }
}

//fastFood functionality functions

function minusValue(name){
	var i;
	for(i = 0; i < 5; i++) {
		if(name == foodNames[i]){
			if(foodValue[i] == 0) return;
			foodValue[i]--;
			var x = foodValue[i].toString();
			document.getElementById(name).innerHTML = x;
		}
	}

	for(i = 0; i < 5; i++) {
		if(name == drinkNames[i]){
			if(drinkValue[i] == 0) return;
			drinkValue[i]--;
			var x = drinkValue[i].toString();
			document.getElementById(name).innerHTML = x;
		}
	}
}

function plusValue(name){
	var i;
	for(i = 0; i < 5; i++) {
		if(name == foodNames[i]){
			if(foodValue[i] == 99) return;
			foodValue[i]++;
			var x = foodValue[i].toString();
			document.getElementById(name).innerHTML = x;
		}
	}

	for(i = 0; i < 5; i++) {
		if(name == drinkNames[i]){
			if(drinkValue[i] == 99) return;
			drinkValue[i]++;
			var x = drinkValue[i].toString();
			document.getElementById(name).innerHTML = x;
		}
	}
}

function resetValues(name){
	var i;

	for(i = 0; i < 5; i ++){
		if(name == "Food"){
			foodValue[i] = 0;
			document.getElementById(foodNames[i]).innerHTML = "0";
		}
		else{
			drinkValue[i] = 0;
			document.getElementById(drinkNames[i]).innerHTML = "0";
		} 
	}
}


function writeOrder(){
	var i;
	for(i = 0; i < 5; i++){
		if(foodValue[i] != 0){
			var id = "carrinho" + foodNames[i];
			document.getElementById(id).style.display = "block";
			id += "Qt";
			document.getElementById(id).style.display = "block";
			document.getElementById(id).innerHTML = foodValue[i].toString();
		}
	}

	for(i = 0; i < 5; i++){
		if(drinkValue[i] != 0){
			var id = "carrinho" + drinkNames[i];
			document.getElementById(id).style.display = "block";
			id += "Qt";
			document.getElementById(id).style.display = "block";
			document.getElementById(id).innerHTML = drinkValue[i].toString();
		}
	}
}

function clearOrder(){
	var i;
	for(i = 0; i < 5; i++){
		var id = "carrinho";
		document.getElementById(id + foodNames[i]).style.display = "none";
		document.getElementById(id + foodNames[i] + "Qt").style.display = "none";
		document.getElementById(id + drinkNames[i]).style.display = "none";
		document.getElementById(id + drinkNames[i] + "Qt").style.display = "none";
	}
}