var app = angular.module("ShowApp", ["ngRoute", "firebase"]);


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

  

        // This code allow for the direct addition of Objects and keys without Arrays. May be useful for editing later. Currently pointless.
        // var obj = $firebaseObject(addRef);
        // obj.$loaded()
        // obj.$bindTo($scope, "widget").then(function() {
        //   console.log("obj", obj);
        //   $scope.widget.schmow = true;
        // obj.$save().then(function(addRef) {
        //   addRef.key() === obj.$id; // true
        // }, function(error) {
        //   console.log("Error:", error);
        // })


      // }) 
      // .catch(function(error) {
      // console.log("Error in the addRef:", error);
      // });


