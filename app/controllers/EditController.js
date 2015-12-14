//The common controller: For the People.
app.controller("EditController",
	["$q", "$scope", "$rootScope", "$firebaseArray", "Auth", "$location",
	function($Q, $scope, $rootScope, $firebaseArray, Auth, $location) {

// Log Out Functionality
  $scope.logOut = function() {
    Auth.useAuth().$unauth();
    $scope.authData = null; 
    $scope.user={};
    $location.path('/login').replace();
  };

// Back to Main Board
  $scope.backToMain = function() {
    $location.path('/common').replace();
  };

    console.log("currentShow", currentShow.$id);

  $scope.editImage = function() {
    console.log("currentShow2", currentShow.$id);  

      var ImageEdit = new Firebase("https://front-end-data.firebaseio.com/shows/" + currentShow.$id +"/img/");
      console.log("ImageEdit", ImageEdit);
      ImageEdit = $firebaseArray(ImageEdit);
      console.log("ImageEdit", ImageEdit);
      ImageEdit.update($scope.edit.imgUrl);

      //Clears the input boxes on add.
      $scope.edit.imgUrl = "";
  };

    // Just in case someone's trying to sneak in. We check if they have loggedIn. Send'em back to log in.
    if ($rootScope.loggedIn !== true) {
      $location.path('/login').replace();
    }

    console.log("currentShowArray", currentShowArray);

    for (var i in currentShowArray[0].comments){
        $scope.comments = currentShowArray[0].comments[i]; 
        console.log("currentShowArray[0].comments[i]", currentShowArray[0].comments[i]);  
    }
     for (var i in currentShowArray[0].reflections){
        $scope.comments = currentShowArray[0].reflections[i];   
    }

    for (var i in currentShowArray[0].img){
        $scope.img = currentShowArray[0].img[i];   
    }

    for (var i in currentShowArray[0].text){
        $scope.text = currentShowArray[0].text[i];   
    }

    for (var i in currentShowArray[0].$id){
        $scope.id = currentShowArray[0].$id[i];   
    }
    
    for (var i in currentShowArray[0].timer){
        $scope.timer = currentShowArray[0].timer[i];   
    }

}]);



  //   $scope.loginUser = function() {
  //     console.log("Login clicked");
  //     $scope.message = null;
  //     $scope.error = null;

  //     Auth.useAuth().$authWithPassword({
  //       email: $scope.user.email,
  //       password: $scope.user.password
  //     }).then(function(userData) {
  //       $scope.message = "User logged in with uid: " + userData.uid;
  //       Auth.logUs(true);
  //       Auth.setUid(userData.uid);
  //     })
  //     .then(function() {
  //     $rootScope.loggedIn = true;
  //     $location.path('/common').replace();
  //     })
 
  //     .catch(function(error) {
  //     console.log("Error in the addRef:", error);
  //     });
  // };

  //   $scope.editShow = function() {
  //       Load the data
  //       Load a page that brings up the data from the view button clicked.
  //       this.data populated to a page
  //       then
  //       view that page
  //     console.log("Edit clicked");
  //     $location.path('/common').replace();

  // };

