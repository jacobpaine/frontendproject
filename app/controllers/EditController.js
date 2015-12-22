//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location", "FirebaseFactory", "$firebaseObject",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location, FirebaseFactory, $firebaseObject) {

  var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
  var slide = FirebaseFactory.getShow();

  $scope.slide = slide;
  
// Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
// if ($rootScope.loggedIn !== true) {
//     $location.path('/login').replace();
// };
//*************************************
var t;

var start = $('#myCarousel').find('.active').attr('data-interval');
t = setTimeout("$('#myCarousel').carousel({interval: 1000});", start-1000);

$('#myCarousel').on('slid.bs.carousel', function () {  
     clearTimeout(t);  
     var duration = $(this).find('.active').attr('data-interval');
    
     $('#myCarousel').carousel('pause');
     t = setTimeout("$('#myCarousel').carousel();", duration-1000);
})

// $('.carousel-control.right').on('click', function(){
//     clearTimeout(t);   
// });

// $('.carousel-control.left').on('click', function(){
//     clearTimeout(t);   
// });

//*******
  var slides = $scope.slides = [];

  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;

  $scope.addSlide = function() {
    var newWidth = 200 + slides.length + 1;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: slide.text,

    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();

  console.log("slides", slides);
  };

//*************************************


// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };


//Adds a slide
    $scope.addSlider = function (slide) {
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

