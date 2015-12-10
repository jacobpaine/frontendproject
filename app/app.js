var app = angular.module("ShowApp", ["ngRoute", "firebase"]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'loginControl'
      })
      .otherwise('/login');
  }]);

  
app.controller("loginControl",
	["$scope", "$firebaseAuth", "$firebaseArray", "Auth", "$firebaseObject", 
	 function($scope, $firebaseAuth, $firebaseArray, Auth, $firebaseObject) {

  //Create an object to put the users in.
	$scope.user={};
    //Oh, look! It's a function in its natural habitat on scope! When we call signUp this happens.
 	   $scope.signUp = function() {
        console.log("sign Up starts");
        //A message on scope, functioning like console.log
        $scope.message = null;
        $scope.error = null;

        // Running Auth.logUs for reasons only Mat may divine. This is a good point in the code to go take a look at Auth. Then come back, don't worry, we'll still be here.

        // Auth.logUs(true);

      //Using useAuth (from Auth.js), which uses AngularFire's $createUser method(?), we set those preset values to specific scopes. (See https://www.firebase.com/docs/web/libraries/angular/api.html - $createUser() for more.)

      Auth.useAuth().$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        console.log("Create User happened, inside then", userData);
        $scope.message = "User created with uid: " + userData.uid;
        //Now we go into Auth.js again and use setUid to set the unique identifier.
        Auth.setUid(userData.uid);


        var addRef = new Firebase("https://front-end-data.firebaseio.com/users/" + userData.uid);
        var addRefArray = $firebaseArray(addRef)
        addRefArray.$loaded()
          .then(function() {
            addRefArray.$add({obj:1});

            console.log("HELLO?", $scope.message);
          }).catch(function(error) {
            $scope.error = error;
          });

        //And if there's a hiccup we use catch to scope an error.
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.loginUser = function() {
      console.log("Login clicked");
      $scope.message = null;
      $scope.error = null;

      Auth.useAuth().$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = "User logged in with uid: " + userData.uid;
        // Auth.logUs(true);
        Auth.setUid(userData.uid);


    
      }) 
      .catch(function(error) {
      console.log("Error in the addRef:", error);
      });
  };

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


