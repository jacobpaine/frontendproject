//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "FirebaseFactory", "$firebaseObject",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, FirebaseFactory, $firebaseObject) {

  var imageEdit = new Firebase("https://front-end-data.firebaseio.com/shows/");
  var materialToUse = $firebaseArray(imageEdit);


// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };

  $scope.createSlide = function (slideInfo) { 
    var slideToAdd = {    
        title: $scope.show.title,
        slide: {
            img: $scope.show.img
         },
        };
        FirebaseFactory.addSlide(slideToAdd);
    };

//Adds a slide
    $scope.addSlide = function () {
      var x = FirebaseFactory.getShow();
      console.log("something!");
      console.log("x", x);

    };

// Back to Main Board
    $scope.backToMain = function () {
    $location.path('/common').replace();
    };

}]);

