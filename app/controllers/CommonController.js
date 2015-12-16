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
        FirebaseFactory.addShow($scope.show.title);
    }

 //        var ShowRef = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title + "/");
	//    	var ImageFile = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title +"/img/");
	//     var CommentFile = new Firebase("https://front-end-data.firebaseio.com/shows/" + $scope.show.title + "/comments/");
	    
 //        var imgObject = {
 //            1: 1,
 //            2: 2,
 //            3: 3,
 //            4: 4,
 //            5: 5
 //            };
 //        ImageFile.update(imgObject);

	//     ShowRef = $firebaseArray(ShowRef);
	//    	ImageFile = $firebaseArray(ImageFile);
	//    	CommentFile = $firebaseArray(CommentFile);

	// 	ShowRef.$add($scope.show.title);
	//     ImageFile.$add($scope.show.imgUrl);
	//    	CommentFile.$add($scope.show.comments);

	   	//Clears the input boxes on add.
	   	// $scope.show.title = "";
	   	// $scope.show.imgUrl = "";


	// };

 //    $scope.viewShow = function() {
 //        currentShowArray = [];
 //        console.log("View clicked");
 //        console.log(" This Show", this.show);

 //        currentShowArray.push(this.show);
 //        $location.path('/view').replace();
 //    }

 //    $scope.editShow = function() {
 //        console.log("edit clicked");
 //        currentShowArray = [];
 //        currentShowArray.push(this.show);
 //        EditFactory.editWhat(currentShowArray[0]);
 //        $location.path('/edit').replace();
 //    }



}]);

