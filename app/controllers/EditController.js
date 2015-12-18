//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "FirebaseFactory", "$firebaseObject",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, FirebaseFactory, $firebaseObject) {

  var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
  var slide = FirebaseFactory.getShow();

  $scope.slide = slide;
  console.log("slide", slide);
  
// Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
if ($rootScope.loggedIn !== true) {
    $location.path('/login').replace();
};

// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };


//Show slides
    // $scope.showSlides = function () {
    //   var slide = FirebaseFactory.getShow();
    //   console.log("xslide", x.slide);

    //   $scope.slide.title
    // };

//Adds a slide
    $scope.addSlide = function (slide) {
      console.log("slide", slide);
      var slideToAdd = {    
          title: $scope.show.title,
          imgUrl: $scope.show.imgUrl,
          timer: $scope.show.timer
        };
      var thing = slide.title;
      showRef.child(slide.$id).push(slideToAdd);
      showRef.child(slide.$id).child("title").remove();

      // FirebaseFactory.addSlide1(slide, slideToAdd, thing);

    }

//Edits a slide
    $scope.editSlide = function (slide) {
      console.log("slide", slide);
      var slideToEdit = {    
          title: $scope.show.title,
          imgUrl: $scope.show.imgUrl,
          timer: $scope.show.timer
        };
      var thing = slide.title;
      showRef.child(slide.$id).push(slideToAdd);
      showRef.child(slide.$id).child("title").remove();

      // FirebaseFactory.addSlide1(slide, slideToAdd, thing);

    }


// Back to Main Board
    $scope.backToMain = function () {
    $location.path('/common').replace();
    };

}]);

