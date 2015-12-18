app.factory("FirebaseFactory", 
  ["$rootScope", "$firebaseAuth", "$firebaseArray", function($rootScope, $firebaseAuth, $firebaseArray) {

//Variables
    var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var uid;
    var current = "";

//Functions used in controllers
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

//This is actually the edit function now
    function editSlide(slide, slideToAdd, thatThing){
      // var slideLoc = showRef.child(slide.$id);
      var slideLoc = showRef.child(thatThing);
      slideLoc.update(slideToAdd);
    }

  return {
      addShow:addShow,
      getShow:getShow,
      setShow:setShow,
      editSlide:editSlide
  };
}]);


