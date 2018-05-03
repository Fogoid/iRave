var foodNames = [ "Bifana", "Burguer", "Cachorro", "Prato Dia", "Especial" ];
var drinkNames = [ "Água", "Coca-Cola", "SuperBock", "IceTea", "7-up" ];
var foodValue = [ 0, 0, 0, 0, 0];
var	drinkValue = [ 0, 0, 0, 0, 0];

function minusValue(name){
	var i;
	for(i = 0; i < 5; i++) {
		if(name == foodNames[i]){
			if(foodValue[i] == 0) return;
			foodValue[i]--;
			document.getElementById("name").innerHTML = " " + foodValue[i];
		}
	}

	for(i = 0; i < 5; i++) {
		if(name == drinkNames[i]){
			if(drinkValue[i] == 0) return;
			drinkValue[i]--;
			document.getElementById("name").innerHTML = " " + drinkValue[i];
		}
	}
}

function plusValue(name){
	var i;
	for(i = 0; i < 5; i++) {
		if(name == foodNames[i]){
			if(foodValue[i] == 99) return;
			foodValue[i]++;
			document.getElementById("name").innerHTML = ""+foodValue[i]+"";
		}
	}

	for(i = 0; i < 5; i++) {
		if(name == drinkNames[i]){
			if(drinkValue[i] == 99) return;
			drinkValue[i]++;
			document.getElementById("name").innerHTML = " " + drinkValue[i];
		}
	}
}

function resetValues(){
	var i;
	for(i = 0; i < 5; i ++){
		foodValue[i] = 0;
		drinkValue[i] = 0;
	}
}