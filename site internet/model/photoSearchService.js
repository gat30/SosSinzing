angular.module('combiApp').factory('photoSearchService', function() {

	'use strict';

	var service = {};

	var size = [];
	///*
	size= [
		{size: 'XS', heightMin: 170, heightMax: 175, weightMin: 52, weightMax: 64},
		{size: 'S', heightMin: 173, heightMax: 178, weightMin: 61, weightMax: 79},
		{size: 'M', heightMin: 175, heightMax: 180, weightMin: 68, weightMax: 79},
		{size: 'MR', heightMin: 175, heightMax: 180, weightMin: 79, weightMax: 91},
		{size: 'ML', heightMin: 181, heightMax: 186, weightMin: 72, weightMax: 83},
		{size: 'L', heightMin: 180, heightMax: 185, weightMin: 77, weightMax: 89},
		{size: 'LR', heightMin: 180, heightMax: 185, weightMin: 89, weightMax: 91},
		{size: 'XL', heightMin: 185, heightMax: 188, weightMin: 86, weightMax: 98},
		{size: 'XXL', heightMin: 188, heightMax: 191, weightMin: 95, weightMax: 107},
		{size: 'XXXL', heightMin: 191, heightMax: 194, weightMin: 109, weightMax: 117}
	];
	//*/
	/*
	size= [
		{size: 'XS', heightMin: 157, heightMax: 163, weightMin: 50, weightMax: 52},
		{size: 'S', heightMin: 160, heightMax: 165, weightMin: 50, weightMax: 57},
		{size: 'M', heightMin: 163, heightMax: 168, weightMin: 54, weightMax: 61},
		{size: 'L', heightMin: 165, heightMax: 170, weightMin: 59, weightMax: 66},
		{size: 'XL', heightMin: 168, heightMax: 173, weightMin: 64, weightMax: 70},
		{size: 'XXL', heightMin: 173, heightMax: 176, weightMin: 68, weightMax: 74},
	];
	*/
	service.findPhotos = function(keyword, callback) {

		// For simplicity we're hard coding the results for the
		// two supported search terms, "water" and "mountains".
		var matches = [];

		matches = [
		{
			title: 'One Flex 5mm 2012',
			thumbUrl: 'pictures/scubapro/oneflex-men-5mm-2012.jpg',
			size: keyword
		},
		{
			title: 'Profile 5mm 2013',
			thumbUrl: 'pictures/scubapro/profile-men-5mm-2013.jpg',
			size: keyword
		},
		{
			title: 'oneflex 7mm 2012',
			thumbUrl: 'pictures/scubapro/oneflex-men-7mm-2012.jpg',
			size: keyword
		},
		{
			title: 'Everflex 3mm 2011',
			thumbUrl: 'pictures/scubapro/everflex-men-3mm-2011.jpg',
			size: keyword
		},
		{
			title: 'Everflex 3mm 2012',
			thumbUrl: 'pictures/scubapro/everflex-men-3mm-2012.jpg',
			size: keyword
		},
		{
			title: 'Profile 3mm 2012',
			thumbUrl: 'pictures/scubapro/profile-men-3mm-2012.jpg',
			size: keyword
		},
		{
			title: 'Everflex 5mm 2012',
			thumbUrl: 'pictures/scubapro/everflex-men-5mm-2012.jpg',
			size: keyword
		},
		{
			title: 'Profile 7mm 2012',
			thumbUrl: 'pictures/scubapro/profile-men-7mm-2012.jpg',
			size: keyword
		}
		];

		callback(matches);
	};
	
	
	service.findSize = function(sexe, height, weight,callback) {
		
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
			
			heightSizeMin = size[i].heightMin;
			heightSizeMax = size[i].heightMax;
			weightSizeMin = size[i].weightMin;
			weightSizeMax = size[i].weightMax;	
			console.log('taille--------------->'+size[i].size)
			
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
		
		callback(size[iMax].size);
		
		
	}
	
	return service;

});