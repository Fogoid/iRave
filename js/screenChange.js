var i = 0;
var stackTo = new Array();
var stackFrom = new Array();
var functionIsRunning = false;
var order=false;
var cols = document.getElementsByClassName('screen');
var last;


// fastFood functionality Vars
var foodNames = [ "Bifana", "Burguer", "Cachorro", "Prato Dia", "Especial" ];
var drinkNames = [ "Água", "Coca-Cola", "SuperBock", "IceTea", "7-Up" ];
var foodValue = [ 0, 0, 0, 0, 0];
var	drinkValue = [ 0, 0, 0, 0, 0];

// Finder functionality Vars
var friendsNumbers = new Array();
var friendsNames = new Array();
var friendsCoordsX = new Array();
var friendsCoordsY = new Array();
var numberOfFriends = 0;
var newFriend = [0, 0, 0, 0, 0];
var names = [ "Luis", "Jaquim", "Manel", "Maria", "Zé"];
var surnames = [ "Silves", "Mota", "Silva", "Emília", "Couves"];
var myCoords = [0, 0];

// Program's core functions
function resetStack(){
	while(stackTo.length != 0)
		stackTo.pop();
	while(stackFrom.length != 0)
		stackFrom.pop();
}

function returnTo(){
	change('Verify', last, 0);
	stackFrom.push(last);
	stackTo.push('TakeAway');
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

	console.log("a: " + a + " b: " + b);
	
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
			resetStack();
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
				resetStack();
				resetValues('Food');
				insert('mainMenu', 'TakeAway');
			}
			if(a == 'Verify' && last == 'Drinks'){
				resetStack();
				resetValues('Drinks');
				insert('mainMenu', 'TakeAway');
			}
			break;
		case 'CheckOrder':
			writeOrder();
			break;
		case 'AddFriend':
			resetNumber();
			break;
		case 'RemoveFriend':
			displayFriends();
			break;
		case 'FriendsGPS':
			writeCoordsOnMap();
			break;
		case 'SpotGPS':
			writeMeOnMap();
			break;
		case 'NeedsGPS':
			writeMeOnMap();
		case 'Location':
			resetLocationDetails();
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
		    	randomcoords();
		    	document.getElementById("time").style.fontSize = "30px";
				document.getElementById("time").style.color = "orange";
				document.getElementById("time").style.fontWeight = "bold";
		    	document.getElementById("date").style.fontSize = "9px";
		    	getRandomId();
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

// Program's settings menu functions

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

function changemultiple(a,b,c){
	change(a,b,c);
	if(b=='OtherEvents'){
		changeEventZone('right');
	}
	if(b=='Concerts'){
		changeConcertStage('right');
	}
}
// Squedule's app functions

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


//fastFood functionality functions

function playAudio() { 
	var x = document.getElementById("myAudio");
    x.play(); 
} 

var order=false;

function pop() {
	order=true;
	var last = stackFrom[stackFrom.length - 1];
    change(last, 'Notification', '1');
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
    console.log(functionIsRunning);
    if(functionIsRunning != true){
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
		else
			if(name == "Drinks"){
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

//Finder Functionality

function incrementNumber(x){
	if(newFriend[x] == 9) return;
	newFriend[x]++;
	changeNumber(x);
}

function decrementNumber(x){
	if(newFriend[x] == 0) return;
	newFriend[x]--;
	changeNumber(x);
}

function changeNumber(x){
	document.getElementById("number" + x.toString()).innerHTML = newFriend[x].toString();
}

function resetNumber(){
	var t;
	for(t = 0; t < 5; t++){
		newFriend[t] = 0;
		changeNumber(t);
	}
}

function checkNumber(){
	var friendNumber = getFriendNumber();
	for(t = 0; t < numberOfFriends; t++){
		if(friendNumber == friendsNumbers[t])
			return false;
	}
}

function getFriendNumber(){
	var friendNumber = "";
	var t;
	for(t = 0; t < 5; t++){
		friendNumber += newFriend[t].toString()
	}
	return friendNumber;
}

function addFriend(){
	if(checkNumber() == false){
		change("AddFriend", "Duplicate", "1");
		return;
	}

	var x = Math.floor((Math.random() * 100) + 1);
	
	if(x > 30){
		var friendNumber = getFriendNumber();
		var friendName = getRandomName();
		friendsNumbers.push(friendNumber);
		friendsNames.push(friendName);
		friendsCoordsX.push(0);
		friendsCoordsY.push(0);
		numberOfFriends++;
		change("AddFriend", "Success", "1");
	}
	else
		change("AddFriend", "Unsuccess", "1");
}


function confirm(x){
	document.getElementById("removeName").innerHTML = friendsNames[x] + "?";
	document.getElementById("confirmBtn").onclick = function() { removeFriend(x) };
	change("RemoveFriend", "Confirm", '1');
}

function removeFriend(x){
	var t;
	for(t = x; t < numberOfFriends - 1; t++){
		friendsNumbers[t] = friendsNumbers[t+1];
		friendsNames[t] = friendsNames[t+1];
		friendsCoordsY[t] = friendsCoordsY[t+1];
		friendsCoordsX[t] = friendsCoordsX[t+1];
	}
	numberOfFriends--;
	friendsNumbers.pop();
	friendsNames.pop();
	friendsCoordsY.pop();
	friendsCoordsY.pop();
	goBack();
}

function displayFriends(){
	var namesHtml = "";
	var removeHtml = "";
	var t;
	
	for(t = 0; t < numberOfFriends; t++){
		namesHtml += "<p style='width:100%; height:30%'>" + friendsNames[t] + "</p>";
		removeHtml += "<p class='alignMiddle' style='width:100%; height:30%; color: red' onclick='confirm(" + t.toString() + ")'>X</p>";
	}

	document.getElementById("FriendsNames").innerHTML = namesHtml;
	document.getElementById("removeFriends").innerHTML = removeHtml;
}

function getRandomName(){
    var x;
    var y;
    var name;
    x = Math.floor((Math.random() * 5));
    y = Math.floor((Math.random() * 5));
    name = names[x] + " " + surnames[y];
    return name;
}
function getmylocation(){
	var x=generateRandom(5,95);
	var y=generateRandom(5,55);
	myCoords[0] = x;
	myCoords[1] = y;
}

function generateRandom(min, max) {
  var number = Math.floor(Math.random() * (max - min)) ;
  return number;
}

function writeMeOnMap(){
	var location =  "<img src='img/my-local.png' id='friends' draggable='false' style='top:"+myCoords[1].toString()+"px ;left:"+myCoords[0].toString() +"px;' >";
	document.getElementById("spotMyLocal").innerHTML = location;
	document.getElementById("needsMyLocal").innerHTML = location;
}

function writeCoordsOnMap(){
	var location = "<img src='img/my-local.png' id='friends' draggable='false' style='top:"+myCoords[1].toString()+"px ;left:"+myCoords[0].toString() +"px;' >";
	for(t=0; t<numberOfFriends; t++){
		var x = friendsCoordsX[t];
		var y = friendsCoordsY[t];
		location+="<img src='img/user-local.png' id='friends' draggable='false' onclick='" + 'getFriendName(' + t + ")' style='top:"+y.toString()+"px ;left:"+x.toString() +"px;' >";
	}
	
	document.getElementById("friendslocal").innerHTML = location;
}

function randomcoords(){
	var k = setTimeout(randomcoords, 10000);
	var length;
	var t;
	var location = getmylocation();
	for(t=0; t<numberOfFriends; t++){
		var x=generateRandom(5,95);
		var y=generateRandom(5,55);
		friendsCoordsX[t] = x;
		friendsCoordsY[t] = y;
	}
}

function getDetails(Spot){
	var details = "";
	switch(Spot){
		case 'G':
			details = 'Green Zone';
			document.getElementById('SpotDetails').onclick = function() { change('SpotGPS', 'OtherEvents', '1') };
			break;
		case 'P':
			details = 'Pool Zone';
			document.getElementById('SpotDetails').onclick = function() { changemultiple('SpotGPS', 'OtherEvents', '1') };
			break;
		case 'A':
			details = 'Stage A';
			document.getElementById('SpotDetails').onclick = function() { change('SpotGPS', 'Concerts', '1') };
			break;
		case 'B':
			details = 'Stage B';
			document.getElementById('SpotDetails').onclick = function() { changemultiple('SpotGPS', 'Concerts', '1') };
			break;
	}
	document.getElementById('SpotDetails').innerHTML = details;
	document.getElementById('SpotDetails').style.display = 'block';
}

function getFriendName(x){
	document.getElementById("friend-name").innerHTML = friendsNames[x];
}

function resetLocationDetails(){
	document.getElementById("friend-name").innerHTML = "";
	document.getElementById('SpotDetails').style.display = "none";
}

function getRandomId(){
	var t;
	var id = "";
	for(t =  0; t < 5; t++){
		id += Math.floor(Math.random()*9 + 1).toString();
	}
	document.getElementById("myId").innerHTML = "My id: " + id;
}