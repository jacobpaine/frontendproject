//The common controller: For the People.
app.controller("CommonController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

//Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null;
    $scope.user={};
    $location.path('/login').replace();
  };

//All functionality for the Common Board
   var commonBoard = new Firebase("https://front-end-data.firebaseio.com/shows/");
//Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
   var allShows = $firebaseArray(commonBoard);
    console.log("allShows", allShows);
    $scope.allShows = allShows;
    // var removeDupes = [];
    // var newArray = {};

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }

    // This code below will be harvested for future search functionality. Although there is likely a better way using $unique.

    // allShows.$loaded()
    // .then(function(){
    //     angular.forEach(allShows, function(show) {
    //         angular.forEach(entry, function(widget) {
    //                 var added = false;
    //         		if (widget === null || widget.title === null || !widget.title) {
    //         			console.log("Nope!");
    //         			console.log(widget);
    //         		} else if (widget.title) {
    //                     console.log("Inside title");
    //                     angular.forEach(removeDupes, function(item) {
    //                         console.log("Inside removeDupes");
    //                         console.log("Item title", item.title);
    //                         console.log("Widget title", widget.title);
    //                         if (item.title === widget.title) {
    //                             added = true;
    //                         }
    //                     });
    //         			if (added === false) {
    //                         removeDupes.push(widget);
    //                     }
    //         		}
    //         });
    //     });
    //     console.log("newArrayAfter", removeDupes);
    //     for (var i = 0; i < removeDupes.length; i++) {
    //     	newArray[i] = removeDupes[i];
    //     }
    //     $scope.pins = [newArray];
    // });
   
    //This is the addShow tool. It just adds shows to Firebase.
	$scope.shows = [];
	$scope.addShow = function (singleShow) {
	    var ShowRef = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title + "/");
	   	var ImageFile = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title +"/img/");
	    var CommentFile = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title + "/comments/");
	 
	    ShowRef = $firebaseArray(ShowRef);
	   	ImageFile = $firebaseArray(ImageFile);
	   	CommentFile = $firebaseArray(CommentFile);

		ShowRef.$add($scope.show.title);
	    ImageFile.$add($scope.show.imgUrl);
	   	CommentFile.$add($scope.show.comments);

	   	//Clears the input boxes on add.
	   	$scope.show.title = "";
	   	$scope.show.imgUrl = "";
	   	$scope.show.comments = "";

	};


}]);