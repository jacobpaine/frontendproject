var app = angular.module("ShowApp", ["ngRoute", "firebase", "ui.bootstrap", 'ngAnimate']);


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
      .when('/view', {
        templateUrl: 'app/partials/view.html',
        controller: 'ViewController'
        })
      .when('/edit', {
        templateUrl: 'app/partials/edit.html',
        controller: 'EditController'
        })
      .otherwise('/common');
  }]);

  

      