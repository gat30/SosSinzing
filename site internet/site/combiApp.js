/* router */
angular.module('combiApp', []).
    config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'view/combiListView.html',   controller: combiListController}).
      //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/'});
}]);