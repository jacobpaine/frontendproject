app.factory("FirebaseFactory", 
  ["$rootScope", "$firebaseAuth", "$firebaseArray", function($rootScope, $firebaseAuth, $firebaseArray) {

//Variables
    var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var uid;
    var current = "";

//Arrays
    var allShows = $firebaseArray(showRef);

//Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
    function addShow(showToAdd){
      var showLoc = showRef.child(showToAdd.title);
      showLoc.set(showToAdd);
    };

    function setShow(show){
      return current = show;
    }

    function getShow(){
      return current;
    }

    function addSlide1(slide, slideToAdd, thatThing){
      // var slideLoc = showRef.child(slide.$id);
      var slideLoc = showRef.child(thatThing);
      slideLoc.update(slideToAdd);
    }

    function doMe (doIt) {
//Put things in here you want to do.
    };

  return {
      addShow:addShow,
      getShow:getShow,
      setShow:setShow,
      addSlide1:addSlide1
  };
}]);


