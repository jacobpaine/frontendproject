//The common controller: For the People.
app.controller("CommonController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "$firebaseObject", "FirebaseFactory",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, $firebaseObject, FirebaseFactory) {

//allshows and showRef placed here so that common.html can ng-repeat over it.
    var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var allShows = $firebaseArray(showRef);

    $scope.allShows = allShows;

//Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    $scope.user={};
    $location.path('/login').replace();
  };

    // $scope.allShows = allShows;

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }

    //This is the addShow tool. It just adds shows to Firebase.

	$scope.createShow = function () { 
    var showToAdd = {    
        title: $scope.show.title,
        slide: {
            img: $scope.show.imgUrl
         },
        };
        FirebaseFactory.addShow(showToAdd);
    }
}]);



    // $scope.createShow = function () { 
    // var showToAdd = {    
    //     title: $scope.show.title,
    //     slide: {
    //         img: $scope.show.imgUrl,
    //         // timer: $scope.show.timer,
    //         // sound: $scope.show.sound,
    //      },
    //     };
    //     FirebaseFactory.addShow(showToAdd);
    // }
