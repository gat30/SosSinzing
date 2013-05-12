
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
  $scope.filterE= [];
  
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
        tmpList.push({value : valeur});
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
        tmpList.push({value : valeur});
      }
    }
    $scope.filterList.size = tmpList;
  }
  
  
  //a modifier avec la fonctiondu bas
  $scope.isInList = function(element, tab){
    
    var isIn = false;
    var i = 0;
    
    while (!isIn && i<tab.length) {
      if (element == tab[i].value) {
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
          combinaison = { name : $scope.combis[i].nom, size : goodSize, year : $scope.combis[i].annee, thickness : parseInt($scope.combis[i].epaisseur), url : $scope.combis[i].urlImage, marque: $scope.chartes[j-1].nom };
          console.log(combinaison.marque);
          bestPhoto.push(combinaison);
        });
      }
      
    }
    $scope.bestCombi = bestPhoto;
    $scope.goodCombi = goodPhoto;
    $scope.updateCombi();
    $scope.show = true;
  }
  
  $scope.selectedCombi = [];
  $scope.filterM = [];
  
  //il faudra intergert les marques aussi :)
  $scope.updateCombi = function (){
    if ($scope.filterE.length == 0) { //si il est vide on affiche tous
      if ($scope.filterM.length == 0) {
        $scope.selectedCombi = $scope.bestCombi;
      }
      else{
        var valeur;
        var tmpcombi = [];
        for (var i=0; i<$scope.bestCombi.length; i++) {
          valeur = $scope.bestCombi[i].marque;
          if ($scope.filterM.indexOf(valeur) >= 0) {
            tmpcombi.push($scope.bestCombi[i]);
          }
        }
        $scope.selectedCombi = tmpcombi;
      }
    }
    else{
      if ($scope.filterM.length == 0) {
        var valeur;
        var tmpcombi = [];
        for (var i=0; i<$scope.bestCombi.length; i++) {
          valeur = parseInt($scope.bestCombi[i].thickness);
          if ($scope.filterE.indexOf(valeur) >= 0) {
            tmpcombi.push($scope.bestCombi[i]);
          }
        }
        $scope.selectedCombi = tmpcombi;
      }
      else{//mélange marque et taille
        var valeur;
        var marque;
        var tmpcombi = [];
        for (var i=0; i<$scope.bestCombi.length; i++) {
          valeur = parseInt($scope.bestCombi[i].thickness);
          marque = $scope.bestCombi[i].marque;
          if ($scope.filterE.indexOf(valeur) >= 0 && $scope.filterM.indexOf(marque) >= 0) {
            tmpcombi.push($scope.bestCombi[i]);
          }
        }
        $scope.selectedCombi = tmpcombi;
      }
      
    }
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
    
    
    var updateSelected = function (action, id) {
        if (action == 'add' & $scope.filterE.indexOf(id) == -1) $scope.filterE.push(id);
        if (action == 'remove' && $scope.filterE.indexOf(id) != -1) $scope.filterE.splice($scope.filterE.indexOf(id), 1);
        $scope.updateCombi();
    }

    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };


    $scope.isSelected = function (id) {
        return $scope.filterE.indexOf(id) >= 0;
    };

    //something extra I couldn't resist adding :)
    $scope.isSelectedAll = function () {
        return $scope.filterE.length === $scope.filterList.size.length;
    };
    
    var updateSelectedM = function (action, id) {
        if (action == 'add' & $scope.filterM.indexOf(id) == -1) $scope.filterM.push(id);
        if (action == 'remove' && $scope.filterM.indexOf(id) != -1) $scope.filterM.splice($scope.filterM.indexOf(id), 1);
        $scope.updateCombi();
    }

    $scope.updateSelectionM = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelectedM(action, id);
    };


    $scope.isSelectedM = function (id) {
        return $scope.filterM.indexOf(id) >= 0;
    };

    //something extra I couldn't resist adding :)
    $scope.isSelectedAllM = function () {
        return $scope.filterM.length === $scope.filterListCharte.length;
    };
}

function PhoneDetailCtrl($scope, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
}
