
/* Controller */

function combiListController($scope, photoSearchService) {

  'use strict';
  
  /**
  List of photos matching the user's latest search term. Each
  object in the array will have a "title" and "thumbUrl"
  */
  $scope.combi = [];
  
  /**
   *filter for the liste of products
   */
  $scope.filter = '';
  $scope.orderProp = 'title';
  $scope.size = '';
  
  /////////////////////// Form //////////////////////
  /*
   *Array for the form 
  */
  $scope.sexe = [
    {name : 'Homme', value : 'homme', morpho : [{name : 'V', url: 'pictures/V.png'}, {name : 'H', url : 'pictures/H.png'}]},
    {name : 'Femme', value : 'femme', morpho : [{name : 'Sablier', url : 'pictures/sablier.png'}, {name : 'rectangle', url : 'pictures/rectangle.png'}, {name : 'Poire', url : 'pictures/poire.png'}]}
  ];
  
  $scope.userSexe = $scope.sexe[0].value;
  $scope.morphos = {value : $scope.sexe[0].morpho, selected : ''};
  
  /*
   * update morpho value when userSexe change
   * we use ng-change in <select> tag 
   */
  $scope.updateForm = function(){
    if ($scope.userSexe == $scope.sexe[0].value) {
      $scope.morphos.value = $scope.sexe[0].morpho;
    }
    else{
      $scope.morphos.value = $scope.sexe[1].morpho;
    }
  }
  
  
  
  /**
   * hidden 
   */
  $scope.hidden = true;
  
  /**
  The keyword the user has entered.
  */
  $scope.userWeight = '';

  $scope.thumbSize = 'small';

  /**
  Starts a new search using the keyword the user has entered.
  */
  $scope.submitSearch = function() {

    $scope.combi = [];

    $scope.hidden = false;
    var keyword = $scope.userWeight;
    photoSearchService.findPhotos(keyword, function(photos) {
      // Update the "searchResults" model.
      $scope.combi = photos;
    });
  };

  $scope.findSize = function (){
    var s = $scope.userSexe;
    var h = $scope.userHeight;
    var w = $scope.userWeight;
    photoSearchService.findSize(s, h, w, function(goodSize){
      $scope.size = goodSize;
        $scope.combi = [];
      photoSearchService.findPhotos(goodSize, function(photos){
        $scope.combi = photos;
      })
    });
  }
  
  
  $scope.setThumbSize = function(size) {
    $scope.thumbSize = size;
  }
  
}


function PhoneDetailCtrl($scope, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
}
