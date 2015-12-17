app.factory("FirebaseFactory", 
  ["$rootScope", "$firebaseAuth", "$firebaseArray", function($rootScope, $firebaseAuth, $firebaseArray) {
  //Variables
    var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var uid;

  //Arrays
    var allShows = $firebaseArray(showRef);

//Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
    function addShow(showToAdd){
      var showLoc = showRef.child(showToAdd.title);
      showLoc.set(showToAdd);
    };

    //Adds a slide
    $scope.addSlide = function(newSlide) {
      console.log("thisShow");
    }

    function editWhat (WhatToEdit){
      console.log("WhatToEdit", WhatToEdit);
      currentShowArray[0] = WhatToEdit;
    };
    
    function viewWhat (WhatToView){
      console.log("WhatToView", WhatToView);
    };
    
    // Back to Main Board
    $scope.backToMain = function() {
    $location.path('/common').replace();
    };

    function doMe (doIt) {
      //Put things in here you want to do.
    };

  return {
      addShow:addShow,

  };
}]);


