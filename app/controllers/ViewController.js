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

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }


    for (var i in currentShowArray[0].comments){
        console.log("value", currentShowArray[0].comments[i]);
    }

    $scope.comments = currentShowArray[0].comments;

//     var currentShow = 

//    var ShowSpecific = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow);
// //Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
//    var ShowSpecificArray = $firebaseArray(ShowSpecific);
//     console.log("ShowSpecificArray", ShowSpecificArray);
//     $scope.ShowSpecificArray = ShowSpecificArray;


//    var commonBoard = new Firebase("https://front-end-data.firebaseio.com/shows/");
// //Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
//    var allShows = $firebaseArray(commonBoard);
//     console.log("allShows", allShows);
//     $scope.allShows = allShows;





}]);



  //   $scope.loginUser = function() {
  //     console.log("Login clicked");
  //     $scope.message = null;
  //     $scope.error = null;

  //     Auth.useAuth().$authWithPassword({
  //       email: $scope.user.email,
  //       password: $scope.user.password
  //     }).then(function(userData) {
  //       $scope.message = "User logged in with uid: " + userData.uid;
  //       Auth.logUs(true);
  //       Auth.setUid(userData.uid);
  //     })
  //     .then(function() {
  //     $rootScope.loggedIn = true;
  //     $location.path('/common').replace();
  //     })
 
  //     .catch(function(error) {
  //     console.log("Error in the addRef:", error);
  //     });
  // };

  //   $scope.editShow = function() {
  //       Load the data
  //       Load a page that brings up the data from the view button clicked.
  //       this.data populated to a page
  //       then
  //       view that page
  //     console.log("Edit clicked");
  //     $location.path('/common').replace();

  // };

