angular.module('combiApp').factory('photoSearchService', function() {

	'use strict';

	var service = {};
	
	//size = tsize in mongodb
	service.findSize = function(sexe, height, weight, size, callback) {
		
		var iMax = -1;
		var max = -111;
		
		var tmpWeight = -5;
		var tmpHeight = -5;
		
		var weightSizeMin;
		var weightSizeMax;
		
		var heightSizeMin;
		var heightSizeMax;
		
		//pour chaque ligne du tableu
		for (var i=0; i< size.length; i++) {
			
			tmpHeight = -5;
			tmpWeight = -5;
			
			heightSizeMin = size[i].hauteurMin;
			heightSizeMax = size[i].hauteurMax;
			weightSizeMin = size[i].poidsMin;
			weightSizeMax = size[i].poidsMax;	
			
			//on note le poids :
			if ((weight >= weightSizeMin) && (weight <= weightSizeMax)) {
				///////////////////////////////////////////////////////a envisager, prendre en compte morpho, taux.. etc
				
				if (weight == weightSizeMin) {
					tmpWeight = 2;
				}
				else if (weight == weightSizeMax) {
					tmpWeight = 1;
				}
				else if (weight == weightSizeMin +1) {
					tmpWeight = 4;
				}
				else if (weight == weightSizeMax -1) {
					tmpWeight = 3;
				}
				else{
					tmpWeight = 5;
				}
			}
			else {
				if (weight == weightSizeMin -1) {
					tmpWeight = -1;
				}
				else if (weight == weightSizeMax+1) {
					tmpWeight = -4;
				}
				else if (weight == weightSizeMax+2) {
					tmpWeight = -5;
				}
				else if (weight == weightSizeMin-2) {
					tmpWeight = -2;
				}
				else  if (weight > weightSizeMax) {
					tmpWeight = -7;
				}
				else if (weight < weightSizeMin) {
					tmpWeight = -6;
				}
			}//end weight
			
			//on note la taille
			//revoir les notes et leur donner une signification (exemple moins de 3 ==> on classe dans les -, - de 0 on ne prend pas en compte la combi ...)
			////////////////////////////////////////////////////////////////////prendre en compte les extrèmes 2m 30kg
			if ((height >= heightSizeMin) && (height <= heightSizeMax)) {
				if (height == heightSizeMin) {
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 5;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 7.5;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 6.5;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = 1.2;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 1.7;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3.2;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
				else if (height == heightSizeMax) {
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = -1;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 8.3;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 8;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = -2.7;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 5.5;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
					/////////////////////////////////////////////////penser a -1 -2
				}
				else if (height == heightSizeMin+1) {
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 4;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 8.5;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 6.6;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = 1.1;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 1.8;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3.1;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
				else if (height == heightSizeMax -1) {
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 1;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 9;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 7;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = -2.6;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 5.4;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
				else { //moyenne
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 2;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 10;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 6.7;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = -2.1;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 5.3;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
			}
			else
			{
				if ((height == heightSizeMin-1) || (height == heightSizeMin-2)) {////////////////////////////peut etre séparer...
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 5.1;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 7;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 6.1;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = -1.3;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 1.6;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3.5;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
				else if ((height == heightSizeMax+1) || (height == heightSizeMax+2)) {
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = -2;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 8.2;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 4;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = -2.8;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 5.6;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = -3;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = -4;
					}//plus d'autres possibilités
				}
				else if (height < heightSizeMin) { //dans le cas ou c'est taille ---- 
					if (tmpWeight == 1 || tmpWeight == 3) { //max ou max-1
						tmpHeight = 5.8;
					}
					else if (tmpWeight == 5) { //moy
						tmpHeight = 5.9;
					}
					else if (tmpWeight == 4 || tmpWeight == 2) { //min ou min+1
						tmpHeight = 3.2;
					}
					else if(tmpWeight == -4 || tmpWeight == -5){ //max+1 ou max+2
						tmpHeight = 2;
					}
					else if (tmpWeight == -1 || tmpWeight == -2) { // min-1 ou min-2
						tmpHeight = 1;
					}
					else if (tmpWeight == -6) { //min ---
						tmpHeight = 0;
					}
					else if (tmpWeight == -7) { // max ++++
						tmpHeight = 1;
					}//plus d'autres possibilités
				}
				//dans le cas ou c'est taille ++++++++
			}
			
			console.log("SCORE :" + tmpHeight);
			if (max < (tmpHeight)) {
				max = tmpHeight;
				iMax = i;
				console.log("Max changé  : "+ max);
			}
			
			
			
		}//end for
		
		callback(size[iMax].size, max);
	}	
	return service;

});