//The common controller: For the People.
app.controller("ViewController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };

// Back to Main Board
  $scope.backToMain = function() {
    $location.path('/common').replace();
  };


    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    // if ($rootScope.loggedIn !== true) {
    //   $location.path('/login').replace();
    // }

}]);




