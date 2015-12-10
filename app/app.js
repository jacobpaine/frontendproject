var app = angular.module("ShowApp", ["ngRoute", "firebase", "ui.bootstrap"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginControl'
      })
      .when('/common', {
        templateUrl: 'app/partials/common.html',
        controller: 'CommonController'
        })
      .otherwise('/login');
  }]);

  

      