var app = angular.module("LibraryApp", ["ngRoute", "firebase", "ui.bootstrap"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'app/partials/start.html',
        controller: 'openLibraryCtrl'
      }),
    $routeProvider
      .when('/mylibrary', {
        templateUrl: 'app/partials/mylibrary.html',
        controller: 'myLibraryCtrl'
      }),
    $routeProvider
      .when('/additions', {
        templateUrl: 'app/partials/additions.html',
        controller: 'additionCtrl'
      }),
    $routeProvider
      .when('/edit', {
        templateUrl: 'app/partials/edit.html',
        controller: 'bookEditCtrl'
      })
      .otherwise('/start');
  }]);


