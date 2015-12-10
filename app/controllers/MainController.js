

app.controller("MainController",
  ["$q", "$scope", "$firebaseAuth",
  function($Q, $scope, $firebaseAuth) {



}]);


app.controller("CommonController",
  ["$q", "$scope", "$firebaseAuth",
  function($Q, $scope, $firebaseAuth) {



}]);


app.controller("loginControl",
	["$scope", "$firebaseAuth", "$firebaseArray", "Auth", "$firebaseObject", "$location", "$rootScope", 
	 function($scope, $firebaseAuth, $firebaseArray, Auth, $firebaseObject, $location, $rootScope) {

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
          })
          .then(function() {
            $rootScope.loggedIn = true;
            $location.path('/common').replace();
          })
          .catch(function(error) {
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
      .then(function() {
      $rootScope.loggedIn = true;
      $location.path('/common').replace();
      })
 
      .catch(function(error) {
      console.log("Error in the addRef:", error);
      });
  };

}]);