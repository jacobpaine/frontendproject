var app = angular.module("LibraryApp", ["ngRoute", "firebase"]);

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
      })
      .otherwise('/start');
  }]);



// var app = angular.module("ShowApp", ["ngRoute", "firebase", "ui.bootstrap", 'ngAnimate']);

// app.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider
//       .when('/login', {
//         templateUrl: 'app/partials/login.html',
//         controller: 'loginControl'
//       })
//       .when('/common', {
//         templateUrl: 'app/partials/common.html',
//         controller: 'CommonController'
//         })
//       .when('/view', {
//         templateUrl: 'app/partials/view.html',
//         controller: 'ViewController'
//         })
//       .when('/edit', {
//         templateUrl: 'app/partials/edit.html',
//         controller: 'EditController'
//         })
//       .otherwise('/common');
//   }]);

  

//       