app.factory("FirebaseFactory", 
  ["$rootScope", "$firebaseAuth", "$firebaseArray", function($rootScope, $firebaseAuth, $firebaseArray) {
  //Variables
    var showRef = new Firebase("https://front-end-data.firebaseio.com/shows/");
    var uid;

  //Arrays
    var allShows = $firebaseArray(showRef);

// ****Fire letter lower case unless its a constructor function

//Puts all the data in the Firebase (commonBoard) into a firebaseArray and sets it to the variable allShows.
    function addShow(showToAdd){
      var showLoc = showRef.child(showToAdd);
      var imgLoc = showLoc.child("img");
      var commentsLoc = showLoc.child("commments")

      imgLoc.child("img1").update("https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/120px-Opossum_2.jpg");
      imgLoc.child("img2").update("https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/120px-Opossum_2.jpg");
      imgLoc.child("img3").update("https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/120px-Opossum_2.jpg");
      imgLoc.child("img4").update("https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/120px-Opossum_2.jpg");
      imgLoc.child("img5").update("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Platypus-sketch.jpg/220px-Platypus-sketch.jpg");

      //Add the name of the show to FireBase
      showLoc = $firebaseArray(showLoc);
      imgLoc = $firebaseArray(imgLoc);

      showLoc.$add(showToAdd);

    };


    function editWhat (WhatToEdit){
      console.log("WhatToEdit", WhatToEdit);
      currentShowArray[0] = WhatToEdit;
    };
    
    function viewWhat (WhatToView){
      console.log("WhatToView", WhatToView);
    };
    

    function doMe (doIt) {
      //Put things in here you want to do.
        addShow();
    };

  return {
      editWhat:editWhat,
      viewWhat:viewWhat,
      addShow:addShow,

  };
}]);


