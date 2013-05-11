
/* Controller */

function combiListController($scope, photoSearchService, $http) {

  'use strict';
  
  /*
   * size of img (small or large)
   */
  $scope.thumbSize = 'small';
  $scope.visible = false;
  $scope.show = false;
  $scope.selected = null;
  $scope.styleClass = 'normal';
  /**
  List of combi. 
  */
  $scope.bestCombi = [];
  $scope.goodCombi = [];
  
  $scope.filterList = {size:[]};
  $scope.filterListcharte = [];
  $scope.test = ["3", "5"];
  
  //la liste des combis et charte récupéré en bd
  $scope.chartes = [];
  $scope.combis = [];
  
  /**
   *filter for the liste of products
   */
  $scope.filter = '';
  $scope.filter2 = '3mm';
  $scope.orderProp = '';
  
  /////////////////////// Form //////////////////////
  /*
   *Array for the form 
  */
  $scope.sexe = [
    {name : 'Homme', value : 'h', morpho : [{name : 'Morphologie V', url: 'pictures/V.png', selected: ""}, {name : 'Morphologie H', url : 'pictures/H.png', selected: ""}]},
    {name : 'Femme', value : 'f', morpho : [{name : 'Sablier', url : 'pictures/sablier.png', selected: ""}, {name : 'Rectangle', url : 'pictures/rectangle.png', selected: ""}, {name : 'Poire', url : 'pictures/poire.png', selected:''}]}
  ];
  
  /**
  The keyword the user has entered.
  */
  $scope.userWeight = '';
  $scope.userHeight = '';
  $scope.userSexe = $scope.sexe[0].value;
  $scope.morphos = {value : $scope.sexe[0].morpho};
  
  /*
   * update morpho value when userSexe change
   * we use ng-change in <select> tag 
   */
  $scope.updateForm = function(){
    //on deselectionne la morpho
    $scope.selected = null;
    
    if ($scope.userSexe == $scope.sexe[0].value) {
      $scope.morphos.value = $scope.sexe[0].morpho;
      $scope.visible = false;//pour le tour de poitrine
    }
    else{
      $scope.morphos.value = $scope.sexe[1].morpho;
      $scope.visible = true;
    }
    console.log($scope.morphos.value);
  }
  
  
  //une fois qu'on a validé on récupère les chartes et combis
  //(peut être ne le faire qu'une fois... a voir..)
  $scope.getChartes = function(){
    $http.jsonp('/chartes/'+$scope.userSexe+'?callback=JSON_CALLBACK').success(function(data){
      $scope.chartes = data;
      $scope.fillListeChartes();
      $scope.getCombi();
    });
  }
  
  $scope.getCombi = function (){
    $http.jsonp('/combis/'+$scope.userSexe+'?callback=JSON_CALLBACK').success(function (data){
      $scope.combis = data;
      $scope.fillListeCombi();
      $scope.findSize();
    });
  }
  
  $scope.fillListeChartes = function (){    
    $scope.filterListCharte = [];
    var valeur;
    var tmpList = [];
    
    //pour chaque combinaison
    for (var i=0; i<$scope.chartes.length; i++) {
      valeur = $scope.chartes[i].nom;
      if (!$scope.isInList(valeur, tmpList)) {
        tmpList.push(valeur.toString());
      }
    }
    $scope.filterListCharte = tmpList;
  }
  
  $scope.fillListeCombi = function (){
    
    $scope.filterList.size = [];
    var valeur;
    var tmpList = [];
    
    //pour chaque combinaison
    for (var i=0; i<$scope.combis.length; i++) {
      valeur = parseInt($scope.combis[i].epaisseur);
      if (!$scope.isInList(valeur, tmpList)) {
        tmpList.push(valeur.toString());
      }
    }
    $scope.filterList.size = tmpList;
  }
  
  $scope.isInList = function(element, tab){
    
    var isIn = false;
    var i = 0;
    
    while (!isIn && i<tab.length) {
      if (element == tab[i]) {
        isIn = true;
      }
      i++ ;
    }
    return isIn;
  }
  /**
   * hidden 
   */
  $scope.hidden = true;

  $scope.invalideForm = function(element){
    if (element.$invalid) {
      return true;
    }
    else{
      if ($scope.selected!=null) { //si on a selectionné une morpho (selected est remit a null si on change de sexe)
        return false;
      }
      else{
        return true;
      }
    }
  }
  
  /*
   *
   *
   */
  $scope.findSize = function (){
    
    var s = $scope.userSexe;
    var h = $scope.userHeight;
    var w = $scope.userWeight;
    var tmpCharte = [];
    var bestPhoto = [];
    var goodPhoto = [];
    var ok = false;
    var j;
    
    for (var i=0; i<$scope.combis.length; i++) {
      
      j=0;
      ok = false;
      while (!ok && j<$scope.chartes.length) {
        if ($scope.combis[i].charte == $scope.chartes[j]._id) {
          ok = true;
          tmpCharte = $scope.chartes[j].tsize;
        }
        j++
      }
      if (ok) {
        photoSearchService.findSize(s, h, w, tmpCharte, function(goodSize, value){
          
          var combinaison = null;
          //6 et 3 arbitraire.. a revoir 
          /*if (value > 5) {
            combinaison = { name : combis[i].combi.name, size : goodSize, year : combis[i].combi.year, thickness : combis[i].combi.thickness, url : combis[i].combi.url};
            bestPhoto.push(combinaison);
          }
          else if(value> 0){
            combinaison = { name : combis[i].combi.name, size : goodSize, year : combis[i].combi.year, thickness : combis[i].combi.thickness, url : combis[i].combi.url};
            goodPhoto.push(combinaison);
          }//sinon ca ne lui va pas :)
          */
          combinaison = { name : $scope.combis[i].nom, size : goodSize, year : $scope.combis[i].annee, thickness : parseInt($scope.combis[i].epaisseur), url : $scope.combis[i].urlImage};
          bestPhoto.push(combinaison);
        });
      }
      
    }
    $scope.bestCombi = bestPhoto;
    $scope.goodCombi = goodPhoto;
    $scope.show = true;
  }
  
  $scope.selectCombi = function(liste){
    var combinaison = {};
    
    angular.forEach(liste, function(value, key){
      if ($scope.isInList(value.thickness, $scope.test)) {
        combinaison[key] = value;
      }
    });
    return combinaison;
    
  }
  
  $scope.setThumbSize = function(size) {
    $scope.thumbSize = size;
  }
  
  $scope.select= function(item) {
       $scope.selected = item; 
    };

    $scope.itemClass = function(item) {
        return item === $scope.selected ? 'active' : undefined;
    };
}

function PhoneDetailCtrl($scope, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
}
