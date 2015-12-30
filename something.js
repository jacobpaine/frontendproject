var app = angular.module("LibraryApp", ["ngRoute", "firebase"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/something', {
        templateUrl: 'something.html',
        controller: 'testCtrl'
      })
      .otherwise('/something');
  }]);

  

  
