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

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    // if ($rootScope.loggedIn !== true) {
    //     $location.path('/login').replace();
    // };

    //This is the createShow tool. It creates shows that are then sent to FireBase.
	$scope.createShow = function (show) { 
        FirebaseFactory.addShow(show);
        //Clear the input boxes on the DOM for looks.
        $scope.show.title = "";
        $scope.show.imgUrl= "";
    };

    $scope.viewEdit = function (thisShow) {
        $location.path('/edit').replace();
        FirebaseFactory.setShow(this.show);
    }

    // Back to Main Board
    $scope.backToMain = function() {
    $location.path('/common').replace();
    };

}]);


